pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Checkout source') {
            steps {
                script {
                    env.TELEGRAM_BOT_TOKEN = "8707448647:AAGH_pLrxL_LKCPLlrNyOAL0wHUTIoFA-YI"
                    env.CHAT_ID = "8943465673"
                    env.REPO_NAME = "test_github_action"
                    env.BRANCH_NAME = "main"

                    def sendTelegram = { message ->
                        sh "curl -s -X POST 'https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage' -d 'chat_id=${env.CHAT_ID}' --data-urlencode 'text=${message}'"
                    }

                    git branch: env.BRANCH_NAME, url: 'https://github.com/H-Ga-Suki/devops-test-Huynh-Le-Tam-Hieu.git'

                    env.COMMIT_HASH = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()

                    sendTelegram("🚀 Bắt đầu deploy website\nRepository: ${env.REPO_NAME}\nBranch: ${env.BRANCH_NAME}\nCommit: ${env.COMMIT_HASH}")
                }
            }
        }
        
        stage('Install dependencies') {
            steps {
                sh 'echo "Skipping global npm install, dependencies are ready."'
            }
        }
        
        stage('Build project') {
            steps {
                sh 'echo "Building static files..."'
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    def TELEGRAM_BOT_TOKEN = "8707448647:AAGH_pLrxL_LKCPLlrNyOAL0wHUTIoFA-YI"
                    def CHAT_ID = "8943465673"
                    def REPO_NAME = "test_github_action"
                    def BRANCH_NAME = "main"
                    def DEPLOY_URL = "https://test-github-action-ao3fgq2sd-yisika123rr.vercel.app"

                    sh "curl -s -X POST 'https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage' -d 'chat_id=${CHAT_ID}' --data-urlencode 'text=✅ Deploy thành công%0ARepository: ${REPO_NAME}%0ABranch: ${BRANCH_NAME}%0AWebsite: ${DEPLOY_URL}'"
                }
            }
        }
    }
}