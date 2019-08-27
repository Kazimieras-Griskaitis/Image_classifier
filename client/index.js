let net;

async function app() {
  console.log('Loading mobilenet..');
	
  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');
}
function startLoadingImage()
{
	document.getElementById('upload-file').reset();;
	document.getElementById("img_top").style.display = 'none';
	document.getElementById("loader-id").style.display = 'block';
}

function imageLoaded()
{
	document.getElementById("img_top").style.display = 'block';
	document.getElementById("loader-id").style.display = 'none';
	$('#result').html('');
	
}

async function readURL(input) 
{
	if (input.files && input.files[0]) 
	{
		var reader = new FileReader();
		imageLoaded();
		reader.onload = function (e)
		{
			$('#img').attr('src', e.target.result);
		};
		$('#btn-predict').show();
		reader.readAsDataURL(input.files[0]);
	}
}	

async function predictNewImage(){
	
	const imgEl = document.getElementById('img');
				const result = await net.classify(imgEl);
				$('#result').html('1. Prediction: ' + result[0].className +'<br />' +
      ' Probability: '+result[0].probability +'<br />' + '<br />' + 
	  '2. Prediction: ' + result[1].className +'<br />' +
      ' Probability: '+result[1].probability +'<br />' + '<br />' +
	  '3. Prediction: ' + result[2].className +'<br />'  +
      ' Probability: '+result[2].probability +'<br />');
}


app();

