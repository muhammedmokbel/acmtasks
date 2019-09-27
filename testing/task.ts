class mydata
{
    constructor()
    {

    }


    getdata()
    {
       const jsonfile = require('jsonfile')
       const file = 'db.json'
       return jsonfile.readFileSync(file); 
    }

}
let format = function (time, format) {
    let t = new Date(time);
    let tf = function (i) { return (i < 10 ? '0' : '') + i };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}



let temp = new mydata(); 

let data= temp.getdata(); 



let events =data.filter(function(data) {
   return  data.committee.includes ("Events")
})

let training =data.filter(function(data) {
    return  data.committee.includes ("Training")
 })

 let FR =data.filter(function(data) {
    return  data.committee.includes ("FR")
 })

 let publicity =data.filter(function(data) {
    return  data.committee.includes ("Publicity")
 })

 let technical =data.filter(function(data) {
    return  data.committee.includes ("Technical")
 })

 
 let media =data.filter(function(data) {
    return  data.committee.includes ("Media")
 })

 let HR =data.filter(function(data) {
    return  data.committee.includes ("HR")
 })




function manipulation (currentcommitte) {


let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let names=[]; 
let mp = new Map()

for (let i =0;i<currentcommitte.length;i++)
{
   let full_name=""; 
   full_name+=currentcommitte[i].firstName; 
   full_name+=" "; 
   full_name+=currentcommitte[i].middleName
   full_name+=" "; 
   full_name+=currentcommitte[i].lastName; 
   names.push(full_name)
   mp.set(full_name,i); 
}
names.sort(); 


let newcommitte=[]; 
for (let i=0;i<names.length;i++)
{
    let index = mp.get(names[i]); 
    let mydate = format(currentcommitte[index].joinDate , 'MM/dd/yyyy'); 
    let d = new Date(mydate);
    let dayName = days[d.getDay()];
    let obj = {name:names[i] , joinedin:dayName , date:mydate} ; 
    newcommitte.push(obj); 
}


return newcommitte; 

}

function display(committee) {
    for (let i=0;i<committee.length;i++)
    {
console.dir(`name: ${committee[i].name} , joined in: ${committee[i].joinedin} , date: ${committee[i].date}`)
    }
}

training=manipulation (training)
technical=manipulation(technical); 
media=manipulation(media); 
events=manipulation(events); 
FR=manipulation(FR); 
HR=manipulation(HR);
publicity=manipulation(publicity);  

console.dir("===============Training==============="); 
display(training);
console.dir("===============technical==============="); 
display(technical);
console.dir("===============media==============="); 
display(media);
console.dir("===============events==============="); 
display(events);
console.dir("===============FR==============="); 
display(FR);
console.dir("===============HR==============="); 
display(HR);
console.dir("===============publicity==============="); 
display(publicity)


