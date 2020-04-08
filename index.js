function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function changeInputError(name, msg) { 
	let target = $('input[aria-label='+ name + ']');
	target.addClass("border-danger");
	target.parent().children(".input-group-prepend").children('span').addClass("bg-danger text-white border-danger");
	let bsalert = '<div class="alert alert-danger mt-1 alert-dismissible fade show" role="alert"><strong>'+ msg +'</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
	$(bsalert).insertAfter(target.parent())

}

function allInputSuccess(){
	$(".alert").alert('close');
	$('input').toArray().forEach((element) => {
		$(element).removeClass("border-danger").addClass("border-success");
		$(element).parent().children(".input-group-prepend").children('span').removeClass("bg-danger text-white border-danger").addClass("bg-success text-white border-success");


	});

}

function getFormValue(name) {
	let target = $('input[aria-label='+ name + ']');
	let numArray = [];
	if (name == "lotoNumbers") {
		for (i = 0; i < 6; i++) {
			
			numArray = numArray.concat( parseInt([target[i].value], 10) );
		}
		return numArray
	} else {
		return target.val()
	}
	
}

function getLotoNumbersArray(){
	let lotoNumbers = []
	for (i = 0; i < 6; i++) {
		
		lotoNumbers = lotoNumbers.concat([getRandomIntInclusive(0, 9)])
	}
	return lotoNumbers
}

const checkLoto = (firstname = "", lastname = "", email = "", lotoNumbers = []) => {
	let winningNumbers = getLotoNumbersArray();
	let msg = "";
	switch (true){ 
		case !firstname.length: 
			msg = "Veuillez fournir un prénom";
			changeInputError("firstname", msg);
			break;

		case !lastname.length: 
			msg = "Veuillez fournir un nom";
			console.log(changeInputError("lastname", msg));
			break;

		case !email.length: 
			msg = "Veuillez fournir un email";
			changeInputError("email", msg);
			break;

		case !(/^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,3}$/.test(email) && email.length >= 8 && email.length <= 30): 
			msg = "Votre email n'est pas valide";
			changeInputError("email", msg);
			break;

		case !(lotoNumbers.length == 6): 
			msg = "Veuillez fournir 6 chiffres";
			changeInputError("lotoNumbers", msg);
			break;

		default:
			allInputSuccess();
			if (JSON.stringify(lotoNumbers) == JSON.stringify(winningNumbers)) {
				alert('Félicitations vous avez gagné 1 million !!!!!');
			} else  {
				alert('Désolé vous avez perdu, les nombres gagnants sont : '+ winningNumbers.join(" ") );
			}
			
			break;

	}
}

function run(){

	checkLoto( getFormValue("firstname"), getFormValue("lastname"), getFormValue("email"), getFormValue("lotoNumbers") );
}

$('.btn').on('click', run)


