pipeline {
  agent any
    
  tools {nodejs "NodeJs"}
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/jemorape/AppNode'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }  
    
            
    stage('Test') {
      steps {
        sh 'node test'
      }
    }
  }
}