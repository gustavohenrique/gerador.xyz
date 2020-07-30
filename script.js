function uuidV4 () {
  var rnds = new Uint8Array(16);
  crypto.getRandomValues(rnds);
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;
  
  function bytesToUuid(buf) {
    var byteToHex = [];
    for (var i = 0; i < 256; ++i) {
      byteToHex[i] = (i + 0x100).toString(16).substr(1);
    }
    var i = 0;
    var bth = byteToHex;
    return bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }
  return bytesToUuid(rnds);
}

function cpf (formated) {
  function dig(n1, n2, n3, n4) { 
    var nums = n1.split('').concat(n2.split(''), n3.split(''));
    if (n4) {
      nums[9] = n4;
    }
    
    var x = 0;
    for (let i = (n4 ? 11:10), j = 0; i >= 2; i--, j++) {
      x += parseInt(nums[j]) * i;
    }
    var y = x % 11;
    return y < 2 ? 0 : 11 - y; 
  }

  function randomThreeNumbers() {
    var n = Math.floor(Math.random() * 999);
    return ('' + n).padStart(3, '0'); 
  }

  var num1 = randomThreeNumbers();
  var num2 = randomThreeNumbers();
  var num3 = randomThreeNumbers();

  var dig1 = dig(num1, num2, num3);
  var dig2 = dig(num1, num2, num3, dig1);

  if (formated) {
    return `${num1}.${num2}.${num3}-${dig1}${dig2}`;
  }
  return `${num1}${num2}${num3}${dig1}${dig2}`;
}

function cnpj (formated) {
  function randomNineNumbers(){
    var ranNum = Math.round(Math.random()*9);
    return ranNum;
  }

  function mod(dividend,divider){
    return Math.round(dividend - (Math.floor(dividend/divider)*divider));
  }

  var n1 = randomNineNumbers();
  var n2 = randomNineNumbers();
  var n3 = randomNineNumbers();
  var n4 = randomNineNumbers();
  var n5 = randomNineNumbers();
  var n6 = randomNineNumbers();
  var n7 = randomNineNumbers();
  var n8 = randomNineNumbers();
  var n9 = 0;
  var n10 = 0;
  var n11 = 0;
  var n12 = 1;

  var d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5;
  d1 = 11 - ( mod(d1,11) );
  if (d1 >= 10) {
    d1 = 0;
  }
 
  var d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6;
  d2 = 11 - ( mod(d2,11) );
  if (d2 >= 10) {
    d2 = 0;
  }

  if (formated) {
    return ''+n1+n2+'.'+n3+n4+n5+'.'+n6+n7+n8+'/'+n9+n10+n11+n12+'-'+d1+d2;
  }
  return ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12+d1+d2;
}

function password () {
  var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var numbers = '0123456789';
  var symbols = '`~!@#$%^&*()_-+=[{]}|;:,.<>/?';
  var characters = letters + numbers + symbols;
  var temp = ''
  for (var x = 0; x < 12; x++) {
    var randomNumber = Math.random();
    var randomFloatingIndex = randomNumber * characters.length;
    var randomIndex = Math.floor(randomFloatingIndex);
    var randomCharacter = characters.charAt(randomIndex);
    temp += randomCharacter
  }
  return temp;
}

function creditcards (formated){
  var visaPrefixList = new Array('4539', '4556', '4916', '4532', '4929', '40240071', '4485', '4716', '4');
  var mastercardPrefixList = new Array('51', '52', '53', '54', '55');
  var amexPrefixList = new Array('34', '37');
  var discoverPrefixList = new Array('6011');
  var dinersPrefixList = new Array('300', '301', '302', '303', '36', '38');
  var enRoutePrefixList = new Array('2014', '2149');
  var jcbPrefixList = new Array('35');
  var voyagerPrefixList = new Array('8699');

  var brands = {
    'VISA': {
        prefixList: visaPrefixList,
        digitCount: 16
    },
    'MasterCard': {
        prefixList: mastercardPrefixList,
        digitCount: 16
    },
    'Amex': {
        prefixList: amexPrefixList,
        digitCount: 15
    },
    'Diners': {
        prefixList: dinersPrefixList,
        digitCount: 16
    }
  };

  function strrev(str) {
    if (!str) {
      return '';
    }
    var revstr='';
    for (var i = str.length-1; i>=0; i--) {
       revstr+=str.charAt(i);
    }
    return revstr;
  }

  function fillNumber(prefix, length) {
    var ccnumber = prefix;
    while ( ccnumber.length < (length - 1) ) {
        ccnumber += Math.floor(Math.random()*10);
    }
    var reversedCCnumberString = strrev(ccnumber);
    var reversedCCnumber = new Array();
    for ( var i=0; i < reversedCCnumberString.length; i++ ) {
        reversedCCnumber[i] = parseInt( reversedCCnumberString.charAt(i) );
    }
    var sum = 0;
    var pos = 0;
    while ( pos < length - 1 ) {
        var odd = reversedCCnumber[ pos ] * 2;
        if ( odd > 9 ) {
            odd -= 9;
        }
        sum += odd;
        if ( pos != (length - 2) ) {
            sum += reversedCCnumber[ pos +1 ];
        }
        pos += 2;
    }

    var checkdigit = (( Math.floor(sum/10) + 1) * 10 - sum) % 10;
    ccnumber += checkdigit;
    return ccnumber;
  }

  function generateCreditCardNumber (prefixList, length) {
    var randomArrayIndex = Math.floor(Math.random() * prefixList.length);
    var ccnumber = prefixList[randomArrayIndex];
    return fillNumber(ccnumber, length);
  }

  // Generates 1 card for each brand
  var creditcards = [];
  for (var key in brands) {
    var brand = brands[key];
    var card = generateCreditCardNumber(brand.prefixList, brand.digitCount);
    if (formated) {
      card = card.substr(0,4) + ' ' + card.substr(4,4) + ' ' + card.substr(8, 4) + ' ' + card.substr(12);
    }
    creditcards.push({
      brand: key,
      number: card
    });
  }
  return creditcards;
}

function copyToClipboard (value) {
  var temporaryInputElement = document.createElement('input');
  temporaryInputElement.type = 'text';
  temporaryInputElement.value = value;
  document.body.appendChild(temporaryInputElement);
  temporaryInputElement.select();
  document.execCommand('Copy');
  document.body.removeChild(temporaryInputElement);
}

function copy (value) {
  return copyToClipboard(value);
}

var components = {
  Quantity: document.querySelector('#quantity'),
  Type: document.querySelector('#type'),
  Formated: document.querySelector('#formated'),
  ResultsSection: document.querySelector('#resultsSection'),
  Results: document.querySelector('#results'),
  GeneratorButton: document.querySelector('#generator')
};


var functions = {
  cpf: cpf,
  cnpj: cnpj,
  uuidV4: uuidV4,
  password: password,
  creditcards: creditcards
};

function insertRows (result) {
  var btnCopy = document.createElement('button');
  btnCopy.classList.add('button');
  btnCopy.innerText = 'Copiar';
  btnCopy.addEventListener('click', function (evt) {
    this.disabled = true;
    this.innerText = 'Copiado';
    copy.call(evt, result);
  });

  var td1 = document.createElement('td');
  td1.innerText = result;
  var td2 = document.createElement('td');
  td2.setAttribute('width', '50');
  td2.appendChild(btnCopy);

  var tr = document.createElement('tr');
  tr.appendChild(td1);
  tr.appendChild(td2);
  components.Results.appendChild(tr);
}

function insertRowsForCreditcards (result) {
    var self = this;
  for (var index=0; index<result.length; index++) {
    var brand = result[index].brand;
    let number = result[index].number;

    var btnCopy = document.createElement('button');
    btnCopy.classList.add('button');
    btnCopy.innerText = 'Copiar';
    // btnCopy.addEventListener('click', copy.bind(this, number)); */
    btnCopy.addEventListener('click', function () {
      this.disabled = true;
      this.innerText = 'Copiado';
      copy(number);
    });

    var td1 = document.createElement('td');
    td1.innerText = brand;
    var td2 = document.createElement('td');
    td2.innerText = number;
    var td3 = document.createElement('td');
    td3.setAttribute('width', '50');
    td3.appendChild(btnCopy);

    var tr = document.createElement('tr');
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    components.Results.appendChild(tr);
  }
}

function generate () {
  components.ResultsSection.classList.remove('hide');
  components.Results.innerHTML = '';
  var quantity = parseInt(components.Quantity.value);
  if (quantity === NaN) {
    return
  }
  var formated = components.Formated.checked;
  var selectedType = components.Type.value;
  var fn = functions[selectedType];
  for (var i=0; i < quantity; i++) {
    var result = fn(formated);
    if (selectedType === 'creditcards') {
      insertRowsForCreditcards(result);
      continue;
    }
    insertRows(result);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  components.GeneratorButton.addEventListener('click', generate);
});
