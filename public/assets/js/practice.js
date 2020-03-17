// Code to pull sentences
var str = "dummy sentence one. dummy sentence two! dummy sentence three? dummy sentence four!!! dummy sentence five?! dummy sentence (six). dummy sentence (6.5).";
console.log(str.match(/[^\.!\?]+[\.!\?]+/g));