const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "zbeeszdq743p",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "q8cv7tD0-nNAlH2lz45ivu8U18K9yClKhTtCWBUhLM0"
})


const pass_field = document.querySelector('.pass-key')
const showBtn = document.querySelector('.show')
const form = document.querySelector('form')
const nameInput = document.getElementById('fullname')
const PasswordInput = document.getElementById('password')
const errorName = form.querySelector('.name .error')
const errorPass = form.querySelector('.password .error')

// getting the user
class Users {
    async getProducts() {
        try {
            let contentful = await client.getEntries({
                content_type: "user"
            })

            let users = contentful.items
            users = users.map(item => {
                const { fullname, password } = item.fields
                return { fullname, password }
            })
            return users
        } catch (error) {
            console.log(error)
        }
    }
}

class Event {
    showPass() {
        showBtn.addEventListener('click', function () {
            if (pass_field.type === "password") {
                pass_field.type = "text"
                showBtn.textContent = "HIDE"
                showBtn.style.color = "#ea7c69"
            } else {
                pass_field.type = "password"
                showBtn.textContent = "SHOW"
                showBtn.style.color = "#222"
            }
        })
    }

    submitForm(user) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            let nameValue = nameInput.value
            let passValue = PasswordInput.value

            let valueNow = user.find(e => {
                return e.fullname === nameValue && e.password === passValue
            })

            if (nameValue == '' && passValue == '') {
                this.checkInput()
            } else if (valueNow === undefined) {
                this.showError()
            } else {
                let { day, time } = this.getTime()
                let userLogin = {
                    fields: {
                        fullname: valueNow.fullname,
                        day: day,
                        time: time
                    }
                }
                this.uploadData(userLogin)
                form.submit()
            }
        })
    }

    checkInputName() {
        errorName.textContent = 'Name can\'t be blank'
        errorPass.textContent = 'Password can\'t be blank'
        errorName.classList.add("error-txt")
        errorPass.classList.add("error-txt")
    }

    checkInputPass() {
        errorName.textContent = 'Name can\'t be blank'
        errorPass.textContent = 'Password can\'t be blank'
        errorName.classList.add("error-txt")
        errorPass.classList.add("error-txt")
    }

    showError() {
        errorName.textContent = 'Username wrong'
        errorPass.textContent = 'Password wrong'
        errorName.classList.add("error-txt")
        errorPass.classList.add("error-txt")
    }

    getTime() {
        let today = new Date()
        let year = today.getFullYear()
        let month = today.getMonth()
        let date = today.getDate()
        let hours = today.getHours()
        let minutes = today.getMinutes()
        let seconds = today.getSeconds()
        let day = 'AM'

        if (hours > 12) {
            day = 'PM'
        }

        if (seconds < 10) {
            seconds = '0' + seconds
        }

        if (minutes < 10) {
            minutes = '0' + minutes
        }

        if (hours < 10) {
            hours = '0' + hours
        }

        // get date add to bill
        return {
            day: `${date}/${month}/${year}`,
            time: `${hours}:${minutes}:${seconds}${day}`
        }
    }

    uploadData(fields) {
        // console.log(fields);
        client.getSpace("userLogin")
            .then((space) => space.getEnvironment('<environment_id>'))
            .then((environment) => environment.createAssetFromFiles(fields))
            .then((asset) => asset.processForAllLocales())
            .then((asset) => asset.publish())
            .catch(console.error)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const event = new Event()
    const users = new Users()

    users.getProducts().then(user => {
        event.showPass()
        event.submitForm(user)
    })
})