const names = document.getElementById("name");
const email = document.getElementById("email");
const hist = document.getElementById("dat");
const pass = document.getElementById("password");
const dob = document.getElementById("dob");
const sub = document.getElementById("submit");
const terms = document.getElementById("acceptTerms");
const date = new Date();
let list_i = []
const dateValidity = (start_date) => {
    const date_use=start_date.replace("-",".")
    const date_user=date_use.split("-").map((d) => Number(d))
    const year_date = (date_user[0] >= (date.getFullYear() - 55) && date_user[0] <= (date.getFullYear() - 18))
    let month_date;
    let day_date;
    if (date_user[0] === date.getFullYear() - 55) {
        month_date = date_user[1] >= (date.getMonth() + 1)
        day_date = date_user[2] >= (date.getDate())
    } else if (year_date) {
        month_date = true
        day_date = true
    } else if (date_user[0] === date.getFullYear() - 18) {
        month_date = date_user[1] <= (date.getMonth() + 1)
        day_date = date_user[2] <= (date.getDate())
    } else {
        month_date = false
        day_date = false
    }
    finish=year_date && month_date && day_date;
    return finish
}

const vaild = (element) => {
    return element.validity.valid
}

const digits = (num) => {
    if (num < 10) {
        return "0" + num;
    } else {
        return num;
    }
}
const sendStorage = (name, email, password, dob, terms) => {
    const userData = {
        name,
        email,
        password,
        dob,
        terms
    }
    list_i.push(userData)
    localStorage.setItem('userData', JSON.stringify(list_i))
}


sub.addEventListener("click", () => {
    const date_user = dob.value

    if (!dateValidity(date_user)) {
        dob.setCustomValidity(`Date must be between ${date.getFullYear() - 55}-${digits(date.getMonth() + 1)}-${digits(date.getDate())} and ${date.getFullYear() - 18}-${digits(date.getMonth() + 1)}-${digits(date.getDate())}`)
    } else {
        dob.setCustomValidity("")
    }

    const allValid = vaild(names) && vaild(email) && vaild(pass) && vaild(dob)

    if (allValid) {
        sendStorage(names.value, email.value, pass.value, dob.value, terms.checked)
    }
})
const getStorage = () => {
    list_i = JSON.parse(localStorage.getItem("userData"))
    if (list_i === null) {
        list_i = []
    } else {
        const view = list_i.map((entry) => {
            let rows = ""
            const allKeys = Object.keys(entry)

            for (let i = 0; i < allKeys.length; i++) {
                rows += `<td>${entry[allKeys[i]]}</td>`
            }

            return `<tr>${rows}</tr>`
        })
        hist.innerHTML += view.join("\n")
    }
}



getStorage()