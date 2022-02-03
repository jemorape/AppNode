pipeline {
  agent any

  tools {nodejs "NodeJs"}

  stages {

    stage('Build') {
      steps {
        sh 'npm install'
      }
    }


    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }
  }
}