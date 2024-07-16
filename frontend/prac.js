function a({name, age, ...props}) {
    console.log(name)
    console.log(age)

    console.log(props)

}   

let obj = {
    name : "sachin",
    age : 24,
    // job : null,
    // color : "red"
}

a(obj)