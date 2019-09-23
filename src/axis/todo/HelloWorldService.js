import axios from 'axios'

class HelloWorldService {
    executeHelloWorldService() {
        console.log('executed service')
        return axios.get('http://localhost:8080/helloworld')
    }

    executeHelloWorldBeanService() {
        console.log('executed service')
        return axios.get('http://localhost:8080/helloworld-bean')
    }

    executeHelloWorldPathVariableService(name) {
        console.log('executed service')
        return axios.get(`http://localhost:8080/helloworld/path-variable/${name}`)
    }
}

export default new HelloWorldService()