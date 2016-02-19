
var contacts = [
  {
    id: 0, names: "Rosa Canales", twitter: "@rosa-canales", email: "canales@koombea.com", phone: "+513182538", status: false
  },

  {
    id: 1, names: "Sara Sala", twitter: "@sara", email: "sara@koombea.com", phone: "+519886548", status: false
  },

  {
    id: 2, names: "Milena Hernandez", twitter: "@milena", email: "milena@koombea.com", phone: "+512186548", status: false
  },

  {
    id: 3, names: "Sandra Ortega", twitter: "@ortega", email: "sandra@koombea.com", phone: "+512922348", status: false
  },

  {
    id: 4, names: 'Jose Arias', twitter: '@JoseArias', email: 'jose.arias@koombea.com', phone: "+573017243031", status: false
  },

  {
    id: 5, names: "Luisa Soto", twitter: "@luisa_soto", email: "luisa-soto@koombea.com", phone: "+512182548", status: false
  },

  {
    id: 6, names: "Jose Arias", twitter: "@Jose_arias", email: "jose@koombea.com", phone: "+511234567", status: false
  },

  {
    id: 7, names: "Patricia Pauth", twitter: "@Patricia_pauth", email: "patricia@koombea.com", phone: "+510987651", status: false
  },

  {
    id: 8, names: "Antony Leon", twitter: "@Antony_leon", email: "antony@koombea.com", phone: "+513459876", status: false
  },

  {
    id: 9, names: "Lina Torres", twitter: "@lina_torres", email: "lina@koombea.com", phone: "+510923846", status: false
  },

  {
    id: 10, names: "Francisco Marin", twitter: "@pacho_m", email: "marin@koombea.com", phone: "+510923246", status: false
  },

  {
    id: 11, names: "Julio Perez", twitter: "@julio_perez", email: "julio@koombea.com", phone: "+512923548", status: false
  }
];

var infoContact = Handlebars.compile($('#contactsTemplate').html()); var auxID = 0;

function loadAllContacts() {
  for(index in contacts){
    $('#allID').append(infoContact(contacts[index]));
  }
  $('#contAll').html('(' + $('#allID tr').length +')');
}

function addToFavorites() {
  if (contacts[auxID].status == false) {
    $('#contFavoritesID').show();
    $('#favoritesID').append(infoContact(contacts[auxID]));
    contacts[auxID].status = true;
    events('#' + (auxID), '#favoritesID');
    $('#AddFavorites').addClass('contact-aggregate');
    // $('.js-star-' + auxID).addClass('star-favorite');
    $('.js-star-' + auxID).css({'color': '#F6B500'});
    $('#delete').hide();
  } else {
    $('#favoritesID').find('.js-ctn-' + auxID).remove();
    $('#AddFavorites').removeClass('contact-aggregate');
    // $('.js-star-' + auxID).removeClass('star-favorite');
    $('.js-star-' + auxID).css({'color': '#C7C7C7'});
    contacts[auxID].status = false;
    $('#mainPopup').hide();
    if($('#favoritesID tr').length == 0) {
      $('#contFavoritesID').hide();
    }
  }
  $('#contFavorites').html('(' + $('#favoritesID tr').length +')');
}

function validateTextBox() {
    var array = ['nameContact', 'twitterContact', 'emailContact', 'phoneContact'], aux = 0;
    for (var i = 0; i < array.length + 1; i++) {
      if($('#' + array[i]).val() != "" && aux <= 3){
        $('#save').attr('disabled', true);
        aux = (aux + 1);
      } else {
        $('#save').attr('disabled', false);
        aux = 0;
      };
    };
  }

  function events(target, type) {
    var link = $(type).find(target);
    link.click(function (){
      $('#mainPopup').show();
      $('#save').attr('disabled', true);
      var name = $('#nameContact');
      var twitter = $('#twitterContact');
      var email = $('#emailContact');
      var phone = $('#phoneContact');
      auxID = this.id;
      if(auxID == 'AddNewContact') {
        $('#imgProfile').attr('src', 'images/new-user.png');
        name.val(''); twitter.val(''); email.val(''); phone.val('');
        name.focus();
        $('#AddFavorites').hide();
        $('#delete').hide();
      } else {
        if (contacts[auxID].status == true) {
          $('#AddFavorites').addClass('contact-aggregate');
          $('#delete').hide();
        } else {
          $('#AddFavorites').removeClass('contact-aggregate');
          $('#delete').show();
        }
        $('.m-popup__txt').html(contacts[auxID].names);
        $('#AddFavorites').show();
        $('#imgProfile').attr('src', 'images/img.png')
        name.val(contacts[auxID].names);
        twitter.val(contacts[auxID].twitter);
        email.val(contacts[auxID].email);
        phone.val(contacts[auxID].phone);
      }
    });
  }

$(document).ready(function() {
  $('#mainPopup').hide();
  $('#contFavoritesID').hide();
  loadAllContacts();
  events('.js-open-popup', '.m-mn');

  $('.m-popup__exit').click(function() {
    $('#mainPopup').hide();
  });

  $(document).on('keydown', function(event) {
    var keyChar = event.keyCode || window.event;
    if (keyChar == '27') {
      $('#mainPopup').hide();
    }
  });

  $('#nameContact, #twitterContact, #emailContact, #phoneContact').bind('keyup click mouseenter mouseleave', function() {
    if (auxID == 'AddNewContact') {
      var auxText = $('#nameContact').val();
      var textContact = $('.m-popup__txt');
       if (auxText == "") {
         textContact.html("New Contact");
       }else {
         textContact.html(auxText);
       };
      validateTextBox();
    }
  });

  $('#save').click(function() {
    contacts.push({id: contacts.length, names: $('#nameContact').val(), twitter: $('#twitterContact').val(), email: $('#emailContact').val(), phone: $('#phoneContact').val(), status: false});
    $('#allID').append(infoContact(contacts[(contacts.length - 1)]));
    events('#' + (contacts.length - 1), '#allID');
    $('.m-popup__exit').click();
    $('#contAll').html('(' + $('#allID tr').length +')');
  });

  $('#delete').click(function() {
    var conAux = 0;
    contacts.splice(auxID, 1);
    for (i = 0; i < contacts.length; i++) {
      contacts[i].id = i;
    }
    $('.js-ctn-' + auxID).remove();

    $('#allID').each(function(){
      $(this).find('tr').each(function() {
        this.className = 'js-ctn-' + conAux;
        $(this).find('td:nth-child(2)').attr('id', conAux);
        $(this).find('td:last-child').addClass('.js-star-' + conAux);
        conAux = (conAux + 1);
      })
    });
    $('.m-popup__exit').click();
    $('#contAll').html('(' + $('#allID tr').length +')');
  });

  $('#AddFavorites').click(function() {
    addToFavorites();
  });

});
