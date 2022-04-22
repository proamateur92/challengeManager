let num = 0;
const checkArr = [];
const obj = {};

function isBlank() {
    const checklists = document.querySelectorAll('.checklist');
    for(let i = 0; i < checklists.length; i++ ) {
      if(checklists[i].value.trim() === '') {
            alert('체크리스트를 작성해주세요.');
            checklists[i].focus();
            checkArr.length = 0;
            obj.clear();
            break;
        }
      obj[i] = {title: checklists[i].value, isDone: 0}
      checkArr.push(obj[i]);
    }
    return checkArr;
}

function saveChal() {
    const checklist = isBlank();
    console.log(checklist);
    if(!checklist || !checklist.length) {
        return false;
    }
    const chal_title = $('#chal_title').val();
    $.ajax({
        type: "POST",
        url: "/saveChallenge",
        data: {
            'title': chal_title,
            'checklist': checklist,
        },
        success: function (response) {
            console.log(response)
        }
    })
}

function addCheck() {
    const checkContent = document.querySelector('.check-content');
    if(num > 3) {
        alert('체크리스트는 5개까지 추가할 수 있습니다.');
        return false;
    }
    num++;
    const checkHtml =
        `<div>
            <input type="text" id="checklist" class="checklist" placeholder="ex) 매일 5km 러닝" data-num=${num}>
        </div>`;
    checkContent.innerHTML += checkHtml;
}