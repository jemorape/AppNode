def ARTIFACTORY_URL = 'http://artifactory.mfsbe.com/'
def GIT_TAG = ''

pipeline {
    agent { label 'NodeJs' }

    options {
        disableConcurrentBuilds()
        //Build discard policy
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        scannerHome = tool 'SonarQube Scanner'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    //Install tools
                    //Install typescript globally for projects with typescript
                    //sh(script: "npm install -g typescript")

                    //Get Git Tag for versioning
                    GIT_TAG = sh(returnStdout: true, script: 'git log -1 --pretty=%h').trim()
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh(script: "npm install && npm run build")
                }
            }
        }
        /*
        *  Using npm script to run unit tests and code coverage.
        */
        stage('Run Unit Tests') {
           steps {
               script {
                   try {
                       sh(script: "npm run test")
                   } catch (exception) {
                       error 'Test Failure...'
                   }
               }
           }
           //Always fail build if there are no test results
           /*post {
                always {
                    script {
                        def files = findFiles glob: 'TestResults/*.TestResults.xml'
                        boolean exists = files.length > 0
                        if (exists) {
                            echo 'Results file(s) found'
                        } else {
                            error('No Test Results have been found...')
                        }
                    }
                }
           }*/
        }
        /*
        *  Sonarqube quality gate check against default quality profile, 80% code coverage, Line coverage for now, no failing unit tests, no critical or blocker
        * known code defects.
        */
        stage('SonarQube Quality Gate Check') {
            steps {
                script {
                        withSonarQubeEnv('Ancestry SonarQube') {
                              sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=split-manager-npm-client -Dsonar.projectName=split-manager-npm-client -Dsonar.projectVersion=${BUILD_NUMBER} -Dsonar.sources=./src -Dsonar.javascript.lcov.reportPath=./coverage/lcov.info"                        
                        }
                }
                timeout(time: 5, unit: 'MINUTES') {
                    // Parameter indicates whether to set pipeline to UNSTABLE if Quality Gate fails
                    // true = set pipeline to UNSTABLE, false = don't
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        /*
        *  This stage is used to publish nuget packages (nuget push) and run dotnet publish
        */
        stage('Publish') {
            steps {
                script {                    
                    sh(returnStdout: true, label: 'Run Publish', script: """
                        npm publish
                    """)
                }
            }
        }
    }
} 