function importText() {
    const regex = /{{(.*?)}}/;
    const inputText = $('textarea#mytextarea').val();
    const outputText = inputText.split(regex).map(n => {
        if(n === "input") return "<input />";
        if(n === "textarea") return "<textarea></textarea>";
        if(n.includes('input:')) {
            const arr = n.split(":");
            return "<input value='"+arr[1]+"' />";
        }
        if(n.includes('textarea:')) {
            const arr = n.split(":");
            return "<textarea>"+arr[1] + "</textarea>";
        }
        return n;
    }).join('');
    $('#result').html(outputText);
}

function exportText() {
    const regex = /<(.*?)>/;
    const inputText = $('#result').html();
    const outputText = inputText.split(regex);

    const arr = [];
    let i = 0;
    while(i < outputText.length) {
        if(outputText[i] === "input") {
            arr.push('{{input}}');
            i++;
        } else if(outputText[i].includes("input value=")) {
            const inputValue = outputText[i].split('=')[1];
            arr.push('{{input:'+inputValue.slice(1, -1)+'}}');
            i++;
        } else if(outputText[i] === 'textarea') {
            if(outputText[i+1] === "") {
                arr.push('{{textarea}}')
            } else {
                arr.push("{{textarea:" + outputText[i+1] + "}}")
            }
            i += 3;
        } else {
            arr.push(outputText[i]);
            i++;
        }
    }
    
    console.log(arr.join(''))
}


$(document).ready(() => {});