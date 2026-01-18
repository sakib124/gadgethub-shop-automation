# Jenkins CI/CD Setup Guide for Playwright Cucumber Tests

This guide will help you set up Jenkins to automatically run your Playwright Cucumber tests on a scheduled basis.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Jenkins Installation](#jenkins-installation)
3. [Required Jenkins Plugins](#required-jenkins-plugins)
4. [Jenkins Configuration](#jenkins-configuration)
5. [Creating the Pipeline Job](#creating-the-pipeline-job)
6. [Scheduling Options](#scheduling-options)
7. [Email Notifications](#email-notifications)
8. [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

- **Jenkins Server** (v2.387 or higher)
- **Git** installed on Jenkins server
- **Node.js** (v18 or higher) on Jenkins server
- Access to your GitHub/GitLab repository
- (Optional) SMTP server for email notifications

---

## 📦 Jenkins Installation

### Windows Installation

#### Option 1: Using Windows Package Manager (winget) - Recommended

```powershell
# Install Jenkins using winget (Windows 10/11)
winget install Jenkins.Jenkins

# Jenkins will start automatically on http://localhost:8080
```

#### Option 2: Using PowerShell to Download and Install

```powershell
# Download Jenkins MSI installer
$jenkinsUrl = "https://get.jenkins.io/windows-stable/2.440.1/jenkins.msi"
$outputPath = "$env:TEMP\jenkins.msi"

# Download the installer
Invoke-WebRequest -Uri $jenkinsUrl -OutFile $outputPath

# Install Jenkins silently (or remove /quiet to see installation wizard)
Start-Process msiexec.exe -ArgumentList "/i", $outputPath, "/quiet" -Wait

# Jenkins service will start automatically
Write-Host "Jenkins installed! Access it at http://localhost:8080"
```

#### Option 3: Using Chocolatey

```powershell
# Install Chocolatey if not already installed
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install Jenkins
choco install jenkins -y

# Jenkins will start automatically on http://localhost:8080
```

#### Option 4: Manual Download and Install

1. **Download Jenkins:**
   ```
   https://www.jenkins.io/download/
   ```

2. **Install Jenkins as Windows Service:**
   - Run the installer (jenkins.msi)
   - Follow the installation wizard
   - Jenkins will start automatically on `http://localhost:8080`

#### Post-Installation Steps (All Methods)

1. **Unlock Jenkins:**
   - Get initial admin password from:
     ```
     C:\Program Files\Jenkins\secrets\initialAdminPassword
     ```
   - Or use PowerShell to view it:
     ```powershell
     Get-Content "C:\Program Files\Jenkins\secrets\initialAdminPassword"
     ```
   - Enter the password in the browser

2. **Install Suggested Plugins:**
   - Choose "Install suggested plugins"
   - Wait for installation to complete

3. **Create Admin User:**
   - Set up your admin credentials
   - Save and continue

### Linux Installation

```bash
# Install Java (required for Jenkins)
sudo apt update
sudo apt install openjdk-17-jdk -y

# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt update
sudo apt install jenkins -y

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Get initial password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

### Docker Installation

```bash
docker run -d -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  --name jenkins \
  jenkins/jenkins:lts
```

---

## 🔌 Required Jenkins Plugins

Install the following plugins from **Manage Jenkins > Plugin Manager**:

### Essential Plugins

1. **NodeJS Plugin**
   - Name: `NodeJS Plugin`
   - Purpose: Run Node.js and npm commands

2. **HTML Publisher Plugin**
   - Name: `HTML Publisher`
   - Purpose: Publish HTML test reports

3. **Cucumber Reports Plugin**
   - Name: `Cucumber Reports`
   - Purpose: Display Cucumber test results

4. **Pipeline Plugin** (usually pre-installed)
   - Name: `Pipeline`
   - Purpose: Create declarative pipelines

5. **Git Plugin** (usually pre-installed)
   - Name: `Git`
   - Purpose: Source code management

### Optional but Recommended

6. **Email Extension Plugin**
   - Name: `Email Extension`
   - Purpose: Send detailed email notifications

7. **Timestamper Plugin**
   - Name: `Timestamper`
   - Purpose: Add timestamps to console output

8. **Workspace Cleanup Plugin**
   - Name: `Workspace Cleanup`
   - Purpose: Clean workspace after builds

9. **Build Timeout Plugin**
   - Name: `Build Timeout`
   - Purpose: Prevent hanging builds

### Installation Steps

1. Go to **Jenkins Dashboard**
2. Click **Manage Jenkins**
3. Click **Plugin Manager**
4. Go to **Available plugins** tab
5. Search for each plugin by name
6. Check the checkbox next to each plugin
7. Click **Install without restart** or **Download now and install after restart**
8. Restart Jenkins if required

---

## ⚙️ Jenkins Configuration

### 1. Configure Node.js

1. Go to **Manage Jenkins > Tools**
2. Scroll to **NodeJS installations**
3. Click **Add NodeJS**
4. Configure:
   - **Name:** `NodeJS 18` (or your preferred version)
   - **Install automatically:** ✅ Checked
   - **Version:** Select Node.js 18.x or higher
   - **Global npm packages to install:** (leave empty)
5. Click **Save**

### 2. Configure Git (if not auto-detected)

1. Go to **Manage Jenkins > Tools**
2. Scroll to **Git installations**
3. If not auto-detected, click **Add Git**
4. Configure:
   - **Name:** `Default`
   - **Path to Git executable:** `git` (or full path on Windows: `C:\Program Files\Git\bin\git.exe`)
5. Click **Save**

### 3. Configure Email Notifications (Optional)

1. Go to **Manage Jenkins > System**
2. Scroll to **Extended E-mail Notification**
3. Configure SMTP settings:
   - **SMTP server:** `smtp.gmail.com` (for Gmail)
   - **SMTP Port:** `587` (TLS) or `465` (SSL)
   - **Credentials:** Add your email credentials
   - **Use SSL:** Check if using port 465
   - **Use TLS:** Check if using port 587
4. Test configuration by sending test email
5. Click **Save**

---

## 🚀 Creating the Pipeline Job

### Step 1: Create New Pipeline Job

1. Go to **Jenkins Dashboard**
2. Click **New Item**
3. Enter job name: `GadgetHub-Automation-Tests`
4. Select **Pipeline**
5. Click **OK**

### Step 2: Configure Pipeline

1. **General Settings:**
   - ✅ **Discard old builds**
     - Strategy: Log Rotation
     - Days to keep builds: `30`
     - Max # of builds to keep: `30`

2. **Build Triggers:**
   - ✅ **Build periodically**
   - Schedule (cron syntax): `0 2 * * *` (2 AM daily)
   - See [Scheduling Options](#scheduling-options) for more patterns

3. **Pipeline Settings:**
   - **Definition:** `Pipeline script from SCM`
   - **SCM:** `Git`
   - **Repository URL:** Your Git repository URL
     ```
     https://github.com/your-username/gadgethub-automation.git
     ```
   - **Credentials:** Add Git credentials if private repo
   - **Branch:** `*/main` or `*/master`
   - **Script Path:** `Jenkinsfile` (or `Jenkinsfile.windows` for Windows)

4. Click **Save**

### Step 3: Test the Pipeline

1. Click **Build Now**
2. Monitor the build in **Console Output**
3. Check test reports after build completes

---

## ⏰ Scheduling Options

Jenkins uses **cron syntax** for scheduling. Format: `MINUTE HOUR DAY_OF_MONTH MONTH DAY_OF_WEEK`

### Common Schedule Examples

```groovy
// Every day at 2 AM
cron('0 2 * * *')

// Every 6 hours (2 AM, 8 AM, 2 PM, 8 PM)
cron('0 2,8,14,20 * * *')

// Every weekday at 9 AM
cron('0 9 * * 1-5')

// Every Monday at 8 AM
cron('0 8 * * 1')

// Every 15 minutes (use H for distribution)
cron('H/15 * * * *')

// Every hour
cron('0 * * * *')

// Every 4 hours
cron('0 */4 * * *')

// Twice daily (9 AM and 6 PM)
cron('0 9,18 * * *')

// Every Sunday at midnight
cron('0 0 * * 0')

// Multiple times per day
cron('0 8,12,17 * * *')  // 8 AM, 12 PM, 5 PM
```

### Cron Field Values

| Field | Values | Special Characters |
|-------|--------|-------------------|
| Minute | 0-59 | `*` `,` `-` `/` `H` |
| Hour | 0-23 | `*` `,` `-` `/` `H` |
| Day of Month | 1-31 | `*` `,` `-` `/` `H` |
| Month | 1-12 | `*` `,` `-` `/` `H` |
| Day of Week | 0-7 (0=Sunday) | `*` `,` `-` `/` `H` |

### Using 'H' for Load Distribution

Jenkins recommends using `H` (hash) instead of fixed numbers to distribute load:

```groovy
// Instead of: cron('0 9 * * *')
// Use: cron('H 9 * * *')  // Run somewhere between 9:00-9:59

// Instead of: cron('*/10 * * * *')
// Use: cron('H/10 * * * *')  // Run every 10 min with offset
```

---

## 📧 Email Notifications

### Configure Email Notifications in Jenkinsfile

Uncomment the email sections in the `Jenkinsfile`:

```groovy
post {
    success {
        emailext(
            subject: "✅ SUCCESS: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
            body: """
                <h2>Test Execution Successful!</h2>
                <p><b>Job:</b> ${env.JOB_NAME}</p>
                <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                <p><b>Duration:</b> ${currentBuild.durationString}</p>
                <br>
                <p>All tests passed successfully.</p>
            """,
            to: 'your-email@example.com',
            mimeType: 'text/html'
        )
    }
    
    failure {
        emailext(
            subject: "❌ FAILURE: ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}",
            body: """
                <h2>Test Execution Failed!</h2>
                <p><b>Job:</b> ${env.JOB_NAME}</p>
                <p><b>Build Number:</b> ${env.BUILD_NUMBER}</p>
                <p><b>Build URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                <p><b>Console Output:</b> <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></p>
                <br>
                <p>Please check the console output and test reports for details.</p>
            """,
            to: 'your-email@example.com',
            attachLog: true,
            mimeType: 'text/html'
        )
    }
}
```

### Gmail Configuration

If using Gmail for SMTP:

1. **Enable 2-Step Verification** in your Google Account
2. **Generate App Password:**
   - Go to Google Account > Security
   - Click "App passwords"
   - Generate password for "Mail"
   - Use this password in Jenkins credentials

3. **SMTP Settings:**
   - Server: `smtp.gmail.com`
   - Port: `587` (TLS)
   - Username: Your Gmail address
   - Password: Generated app password

---

## 📊 Viewing Test Reports

After each build, you can view:

### 1. Cucumber HTML Report
- Click on build number
- Click **Cucumber Test Report** in left sidebar
- View detailed BDD test results

### 2. Playwright Report
- Click on build number
- Click **Playwright Test Report** in left sidebar
- View API test results

### 3. Console Output
- Click on build number
- Click **Console Output**
- View real-time execution logs

### 4. Build Artifacts
- Click on build number
- Click **Build Artifacts**
- Download:
  - `cucumber-report.html`
  - `cucumber-report.json`
  - `playwright-report/`
  - `screenshots/` (on failure)

---

## 🐛 Troubleshooting

### Issue: Node.js not found

**Solution:**
1. Verify Node.js installation on Jenkins server
2. Check **Manage Jenkins > Tools > NodeJS**
3. Ensure correct Node.js version is selected in pipeline

### Issue: Playwright browsers not installing

**Solution:**
1. Run manually on Jenkins server:
   ```bash
   npx playwright install-deps
   ```
2. Ensure sufficient disk space
3. Check network connectivity

### Issue: Tests failing in CI but passing locally

**Solution:**
1. Enable screenshots on failure in `playwright.config.js`:
   ```javascript
   screenshot: 'only-on-failure'
   ```
2. Check environment variables in Jenkinsfile
3. Verify headless mode is enabled for CI
4. Increase timeouts for CI environment

### Issue: Mock API server not starting

**Solution:**
1. Check port 3000 is not in use
2. Verify api-mock files are in repository
3. Check Node.js version compatibility
4. Review console output for errors

### Issue: Reports not publishing

**Solution:**
1. Verify **HTML Publisher Plugin** is installed
2. Check report paths in Jenkinsfile match actual paths
3. Ensure reports are generated before publishing stage
4. Check Jenkins CSP settings:
   ```
   Manage Jenkins > Script Console
   System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")
   ```

### Issue: Git authentication failing

**Solution:**
1. Add credentials in **Manage Jenkins > Credentials**
2. Use SSH key or Personal Access Token
3. Test repository access from Jenkins server
4. Check repository URL is correct

### Issue: Build timing out

**Solution:**
1. Increase timeout in Jenkinsfile:
   ```groovy
   options {
       timeout(time: 2, unit: 'HOURS')
   }
   ```
2. Optimize test execution time
3. Run tests in parallel if possible

---

## 📝 Additional Configuration

### Parallel Test Execution

To run tests in parallel, modify the Jenkinsfile:

```groovy
stage('Run Cucumber Tests') {
    steps {
        script {
            nodejs(nodeJSInstallationName: "NodeJS ${NODE_VERSION}") {
                bat 'npm run test:parallel || exit 0'
            }
        }
    }
}
```

### Different Environments

Create multiple Jenkinsfiles for different environments:

```
Jenkinsfile.dev      # Development environment
Jenkinsfile.staging  # Staging environment
Jenkinsfile.prod     # Production environment
```

### Conditional Execution

Run tests only on specific branches:

```groovy
when {
    branch 'main'
}
```

### Manual Triggers

Allow manual builds with parameters:

```groovy
parameters {
    choice(
        name: 'ENVIRONMENT',
        choices: ['dev', 'staging', 'prod'],
        description: 'Select environment'
    )
    booleanParam(
        name: 'RUN_API_TESTS',
        defaultValue: true,
        description: 'Run API tests'
    )
}
```

---

## 🎯 Best Practices

1. **Use Version Control:** Always commit Jenkinsfile to repository
2. **Keep Credentials Secure:** Use Jenkins Credentials Manager
3. **Monitor Build Times:** Optimize slow tests
4. **Archive Important Artifacts:** Keep reports for analysis
5. **Set Appropriate Timeouts:** Prevent hanging builds
6. **Use Distributed Load:** Use `H` in cron expressions
7. **Clean Workspace:** Remove old build artifacts
8. **Enable Notifications:** Stay informed of test failures
9. **Document Changes:** Update this guide as needed
10. **Regular Maintenance:** Update plugins and Jenkins regularly

---

## 📚 Additional Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
- [Playwright CI/CD Guide](https://playwright.dev/docs/ci)
- [Cucumber Jenkins Integration](https://github.com/jenkinsci/cucumber-reports-plugin)
- [Cron Expression Generator](https://crontab.guru/)

---

## 🆘 Support

For issues or questions:
1. Check Jenkins console output
2. Review this documentation
3. Search Jenkins community forums
4. Contact your DevOps team

---

**Last Updated:** January 11, 2026
**Jenkins Version:** 2.440+
**Playwright Version:** 1.41.0
**Cucumber Version:** 12.5.0
