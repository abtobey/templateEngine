const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");
const render = require("./lib/htmlRenderer");
let employees=[]

const generalQuestions=[
    {
        type: "input",
        name: "employeeName",
        message: "Name: ",
    },
    {
        type: "input",
        name: "id",
        message: "Employee ID: ",
    },
    {
        type: "input",
        name: "email",
        message: "Email address",
        //validate that email contains an @ and a .
          validate: function(text){
              if(text.split("@").length <2 || text.split(".").length <2 ){
                  return "please enter valid email";
              }
              return true
          },
    },
    {
        type: "list",
        name: "role",
        message: "Role: ",
        choices:["Manager", "Engineer", "Intern"],
    }
]

const managerQuestion=[
    {
        type:"input",
        name:"officeNumber",
        message: "Office Number: ",
    },
    {
        type: "list",
        name: "addNext",
        message: "Add another employee?",
        choices:["Yes","No"],
    }
]
const engineerQuestion=[
    {
        type:"input",
        name:"github",
        message: "Github: ",
    },
    {
        type: "list",
        name: "addNext",
        message: "Add another employee?",
        choices:["Yes","No"],
    }
]
const internQuestion=[
    {
        type:"input",
        name:"school",
        message: "School: ",
    },
    {
        type: "list",
        name: "addNext",
        message: "Add another employee?",
        choices:["Yes","No"],
    }
]

addNewEmployee();
function addNewEmployee(){
inquirer.prompt(generalQuestions).then(answers => {
    const emp = new Employee(answers.employeeName, answers.id, answers.email);
    switch(answers.role){
        case "Manager":
            //ask for office number
            inquirer.prompt(managerQuestion).then(office =>{
            const manager=new Manager(emp.name, emp.id, emp.email, office.officeNumber)
            employees.push(manager);
            if(office.addNext==="Yes"){
                return addNewEmployee();
            }
            return render.render(employees);
            });
            break;
        case "Engineer":
            //ask for github
            inquirer.prompt(engineerQuestion).then(git =>{
            const engineer=new Engineer(emp.name, emp.id, emp.email, git.github)
            employees.push(engineer);
            if(git.addNext==="Yes"){
                return addNewEmployee();
            }
            return render.render(employees);
            });
            break;
        case "Intern":
            //ask for university
            inquirer.prompt(internQuestion).then(uni =>{
            const intern=new Intern(emp.name, emp.id, emp.email, uni.school)
            employees.push(intern);
            if(uni.addNext==="Yes"){
                return addNewEmployee();
            }
            return render.render(employees);
            });
            break;
    }
    
});
}



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
