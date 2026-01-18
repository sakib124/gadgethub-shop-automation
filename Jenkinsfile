pipeline {
    agent any
    
    // Schedule tests to run periodically
    triggers {
        // Run tests every day at 2 AM
        cron('0 2 * * *')
        
        // Additional schedule options (uncomment as needed):
        // cron('0 */6 * * *')      // Every 6 hours
        // cron('0 8,12,17 * * *')  // At 8 AM, 12 PM, and 5 PM
        // cron('0 0 * * 1-5')      // Midnight on weekdays
        // cron('H/15 * * * *')     // Every 15 minutes (distributed)
    }
    
    environment {
        // Node version to use
        NODE_VERSION = '18'
        
        // Set headless mode for CI
        CI = 'true'
        
        // Playwright environment variables
        PLAYWRIGHT_BROWSERS_PATH = "${WORKSPACE}/playwright-browsers"
        
        // Test results directories
        CUCUMBER_REPORT_DIR = 'cucumber-report.html'
        PLAYWRIGHT_REPORT_DIR = 'playwright-report'
        SCREENSHOTS_DIR = 'screenshots'
    }
    
    options {
        // Keep build artifacts for 30 days
        buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '30'))
        
        // Timeout for entire pipeline
        timeout(time: 1, unit: 'HOURS')
        
        // Add timestamps to console output
        timestamps()
        
        // Disable concurrent builds
        disableConcurrentBuilds()
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                echo "Setting up Node.js ${NODE_VERSION}..."
                script {
                    // Using NodeJS plugin
                    nodejs(nodeJSInstallationName: "NodeJS ${NODE_VERSION}") {
                        sh 'node --version'
                        sh 'npm --version'
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                script {
                    nodejs(nodeJSInstallationName: "NodeJS ${NODE_VERSION}") {
                        sh 'npm ci --prefer-offline --no-audit'
                    }
                }
            }
        }
        
        stage('Install Playwright Browsers') {
            steps {
                echo 'Installing Playwright browsers...'
                script {
                    nodejs(nodeJSInstallationName: "NodeJS ${NODE_VERSION}") {
                        sh 'npx playwright install chromium --with-deps'
                    }
                }
            }
        }
        
        stage('Start Mock API Server') {
            steps {
                echo 'Starting Mock API Server...'
                script {
                    nodejs(nodeJSInstallationName: "NodeJS ${NODE_VERSION}") {
                        // Start API server in background
                        sh 'nohup npm run api:start > api-server.log 2>&1 &'
                        sh 'echo $! > api-server.pid'
                        
                        // Wait for server to be ready
                        sh 'sleep 5'
                        
                        // Verify server is running
                        sh 'curl -f http://localhost:3000/api/products || exit 1'
                    }
                }
            }
        }
        
        stage('Run Cucumber Tests') {
            steps {
                echo 'Running Cucumber BDD tests...'
                script {
                    nodejs(nodeJSInstallationName: "NodeJS ${NODE_VERSION}") {
                        // Run tests and continue even if some fail
                        sh '''
                            npm test || true
                        '''
                    }
                }
            }
        }
        
        stage('Run Playwright API Tests') {
            steps {
                echo 'Running Playwright API tests...'
                script {
                    nodejs(nodeJSInstallationName: "NodeJS ${NODE_VERSION}") {
                        sh '''
                            npm run test:api || true
                        '''
                    }
                }
            }
        }
        
        stage('Generate Reports') {
            steps {
                echo 'Generating test reports...'
                script {
                    nodejs(nodeJSInstallationName: "NodeJS ${NODE_VERSION}") {
                        sh 'npm run report || true'
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up...'
            
            // Stop Mock API Server
            script {
                sh '''
                    if [ -f api-server.pid ]; then
                        kill $(cat api-server.pid) || true
                        rm api-server.pid
                    fi
                '''
            }
            
            // Archive test results
            archiveArtifacts artifacts: 'cucumber-report.html, cucumber-report.json, playwright-report/**, screenshots/**', 
                             allowEmptyArchive: true, 
                             fingerprint: true
            
            // Publish HTML reports
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: '.',
                reportFiles: 'cucumber-report.html',
                reportName: 'Cucumber Test Report',
                reportTitles: 'Cucumber BDD Test Results'
            ])
            
            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report',
                reportTitles: 'Playwright API Test Results'
            ])
            
            // Publish Cucumber test results
            cucumber buildStatus: 'UNSTABLE',
                     fileIncludePattern: 'cucumber-report.json',
                     trendsLimit: 10
            
            // Clean workspace
            cleanWs(
                cleanWhenAborted: true,
                cleanWhenFailure: false,
                cleanWhenNotBuilt: false,
                cleanWhenSuccess: true,
                cleanWhenUnstable: false,
                deleteDirs: true
            )
        }
        
        success {
            echo 'Tests completed successfully! ✅'
            
            // Send email notification on success (optional)
            // emailext(
            //     subject: "✅ SUCCESS: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
            //     body: """
            //         <p>Test execution completed successfully!</p>
            //         <p><b>Job:</b> ${env.JOB_NAME}</p>
            //         <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
            //         <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
            //     """,
            //     to: 'your-email@example.com',
            //     mimeType: 'text/html'
            // )
        }
        
        failure {
            echo 'Tests failed! ❌'
            
            // Send email notification on failure (optional)
            // emailext(
            //     subject: "❌ FAILURE: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
            //     body: """
            //         <p>Test execution failed!</p>
            //         <p><b>Job:</b> ${env.JOB_NAME}</p>
            //         <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
            //         <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
            //         <p>Please check the console output and test reports.</p>
            //     """,
            //     to: 'your-email@example.com',
            //     mimeType: 'text/html'
            // )
        }
        
        unstable {
            echo 'Tests unstable! ⚠️'
        }
    }
}
