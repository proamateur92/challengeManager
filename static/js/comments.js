function ajaxComment(ajaxType, ajaxUrl, ajaxData) {
	if (ajaxType === "GET") {
		// 조회
		$.ajax({
			type: ajaxType,
			url: ajaxUrl,
			success: function (response) {
				const data = response["comments"];
				$.each(data, function (i, v) {
					const temp_html = $("#templateCardItem")
						.html()
						.replace("${id}", v["_id"])
						.replace("${name}", v["name"])
						.replace("${comment}", v["comment"]);

					$(".card-wrapper").append(temp_html);
				});
			},
		});
	} else {
		// 추가, 편집, 삭제
		$.ajax({
			type: ajaxType,
			url: ajaxUrl,
			data: ajaxData,
			success: function (response) {
				if (response["msg"] === "Success") {
					location.reload();
				} else if (response["msg"] === "Failed") {
					alert("실패");
				}
			},
		});
	} // PUT은 전체 편집, PATCH는 일부 편집
}

function getComments() {
	const challengeId = $("body").data("challenge-id");
	ajaxComment("GET", `/api/comment/${challengeId}`);
}

function addComments() {
	const data = {
		challenge_id: $("body").data("challenge-id"),
		name: $("#inputId").val(),
		password: $("#inputPassword").val(),
		comment: $("#inputComment").val(),
	};

	ajaxComment("POST", "/api/comment", data);
}

function modifyComments(elem) {
	const data = {
		object_id: elem.data("comment-id"),
		pw: prompt("password"),
		name: elem.find(".form-control[name='name']").val(),
		comment: elem.find(".form-control[name='comment']").val(),
	};

	ajaxComment("PUT", "/api/comment", data);
}

function removeComments(elem) {
	const data = {
		object_id: elem.data("comment-id"),
		pw: prompt("password"),
	};

	ajaxComment("DELETE", "/api/comment", data);
}

function handleSubmit(e) {
	e.preventDefault();
	addComments();
}

function handleSubmitModify(e) {
	e.preventDefault();
	modifyComments($(e.target).parents(".card"));
}

function handleClick(e) {
	if ($(e.target).is("A")) {
		const card = $(e.target).parents(".card");
		if ($(e.target).text() === "편집하기") {
			const cardBody = card.children(".card-body");
			const form = $("#templateInputForm")
				.html()
				.replace("${author}", card.find(".card-title").text())
				.replace("${comment}", card.find(".card-text").text());
			cardBody.html(form);
		} else if ($(e.target).text() === "삭제하기") {
			removeComments(card);
		}
	}
}

$(document).ready(function () {
	$(".frm-add form").on("submit", handleSubmit);
	$(".card-wrapper").on("click", handleClick);
	$(".card-wrapper").on("submit", handleSubmitModify);

	getComments();
});
