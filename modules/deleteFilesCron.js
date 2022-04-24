import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://aomrbpbirewwgkhdbvvm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvbXJicGJpcmV3d2draGRidnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA0NTgwMzAsImV4cCI6MTk2NjAzNDAzMH0.oxBVcGzYHknRmO7O53p5mfCh0A4Lf4Y5hViELuNQcOo')
let cron = require('node-cron')

export default function() {
    this.nuxt.hook('modules:done', () => {
        createCronDeleteJob()
    })

    async function createCronDeleteJob() {
        console.log('\u221a\u001b[1;34m Delete expired files CRON job bootstrapped.');

        cron.schedule('0 0 0,12 * * *', () => {
            expiredFiles()
            console.warn('CRON job: Deleting expired files.')
        })
    }

    async function expiredFiles() {
        const expiredQueryResult = await supabase.from('file_links').select('id, expiry_at, file_hash').lte('expiry_at', new Date().toISOString())

        if (expiredQueryResult && expiredQueryResult.error) {
            console.error('CRON job error: ', expiredQueryResult.error)
            return
        }

        if (expiredQueryResult && expiredQueryResult.data.length === 0) {
            console.info('CRON job: No expired files to be deleted.')
            return
        }
        
        const tableRowsDeleteResult = await supabase.from('file_links').delete().lte('expiry_at', new Date().toISOString())

        if (tableRowsDeleteResult.error) {
            console.error('CRON job error: ', tableRowsDeleteResult.error)
            return
        }
        console.info(`CRON job: Total of ${tableRowsDeleteResult.data.length} rows deleted from table 'file_links'`)

        if (expiredQueryResult && expiredQueryResult.data) {
            const filesToDelete = []
            expiredQueryResult.data.forEach(row => {
                filesToDelete.push(row.file_hash)
            })
            
            if (filesToDelete.length) {
                const filesDeleteResult = await supabase.storage.from('file-bucket').remove(filesToDelete)
    
                if (filesDeleteResult.error) {
                    console.error('CRON job error: ', filesDeleteResult.error)
                    return
                }
                console.info(`CRON job: Total of ${filesDeleteResult.data.length} files deleted from bucket 'file-bucket'`)
            }

        }
    }
}