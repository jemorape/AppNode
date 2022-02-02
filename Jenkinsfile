pipeline {
  agent any

  tools {nodejs "node"}

  stages {

    stage('Git') {
      steps {
        git 'https://github.com/****/****'
      }
    }

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