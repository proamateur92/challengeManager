let checkArr = [];
let obj = {};

$(document).ready(function(){
  showChallenge();
});

function showChallenge() {
  $.ajax({
    type: 'GET',
    url: '/getChallenge',
    data: {},
    success: (response) => {
      const challenges = response.challenges;
      for(let challenge of challenges) {
        const chalTitle = challenge.title;
        const createDate = challenge.createDate;
        const checkLists = JSON.parse(challenge.checkList);
        const chalHtml =
            `<ul class="challenge-item">
              <h2>${chalTitle}</h2></ul>`;
        $('.challenge-container').append(chalHtml);
        for(let checklist of checkLists) {
          let checkHtml = '';
          if(!checklist.isDone) {
            checkHtml =
                `<li class="challenge-list">
                  <span class="done">✅ ${checklist.title}</span>
                  <button class="btn btn-secondary">완료</button>
                </li>`;
          } else {
            checkHtml =
                `<li class="challenge-list">
                    <span class="done">✅ ${checklist.title}</span>
                </li>`;
          }
          $('.challenge-item').append(checkHtml);
        }
      }
    }
  })
}

function isBlank() {
  const checklists = document.querySelectorAll('.checklist');
  for (let i = 0; i < checklists.length; i++) {
    if (checklists[i].value.trim() === '') {
      alert('체크리스트를 작성해주세요.');
      checklists[i].focus();
      checkArr = [];
      obj.size = {};
      return false;
    }
    obj[i] = {
      index: i,
      title: checklists[i].value,
      isDone: 0
    };
    checkArr.push(obj[i]);
  }
  return checkArr;
}

function saveChal() {
  obj = {};
  checkArr = [];
  let checklist = isBlank();
  if (!checklist || !checklist.length) {
    return false;
  }
  const chal_title = $('#chal_title').val();
  $.ajax({
    type: 'POST',
    url: '/saveChallenge',
    data: {
      title: chal_title,
      checklist: JSON.stringify(checklist),
    },
    success: function (response) {
      alert(response.result);
      location.reload();
    },
  });
}

function addCheck() {
  let num = 0;
  const checkContent = document.querySelector('.checklist-container');
  if (num > 3) {
    alert('체크리스트는 5개까지 추가할 수 있습니다.');
    return false;
  }
  num++;
  const checkHtml = `<div class="form-floating mb-3">
                <input type="text" id="checklist" class="form-control checklist" placeholder="체크리스트 명" data-num="${num}" />
                <label for="checklist">체크리스트 명 ex) 매일 5km 러닝</label>
        </div>`;
  $('.checklist-container').append(checkHtml);
}
