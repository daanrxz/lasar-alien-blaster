function createToDom(elementType, className, parent, src, text){
    const element = document.createElement(elementType);
    if(className[0]==="id"){
        element.id = className[1]
    }
    else{
        for(let i=1; i<className.length; i++){
            element.classList.add(className[i])
        }
    }
    if(elementType==="img"){
        element.src = src;
    }
    if(text){
        element.innerText = text;
    }
    if(parent){
        parent.appendChild(element)
        return element
    }
    else{
        return element
    }
}