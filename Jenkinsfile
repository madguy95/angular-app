pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                // Get some code from a GitHub repository
                git url: "https://github.com/madguy95/angular-app.git",
                        branch: 'main'

                // Run Maven on a Unix agent.
                sh "docker build -t angular-app ."

                // To run Maven on a Windows agent, use
                // bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }
        }
        
        stage('Push image to registry') {
            steps {
                // Run Maven on a Unix agent.
                withCredentials([usernamePassword(credentialsId: 'docker-registry-user', passwordVariable: 'password', usernameVariable: 'username')]) {
                    sh "docker login -u $username -p $password poordev.ddns.net:5000"
                }
                sh "docker tag angular-app:latest poordev.ddns.net:5000/angular-app:latest"
                sh "docker push poordev.ddns.net:5000/angular-app:latest"
                // To run Maven on a Windows agent, use
                // bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }
        }

        stage('Dump merged config') {
            steps {
                withKubeCredentials([
                    [credentialsId: 'kubect_token', serverUrl: 'https://poordev.ddns.net:6443']
                ]) {
                    sh 'chmod +x deploy.sh'
                    sh './deploy.sh'
                }
            }
        }
    }
}
