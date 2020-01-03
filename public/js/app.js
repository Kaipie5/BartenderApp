'use strict'


$(document).ready(function() {
    console.log("TRYING TO HIDE")
    $('.editForm input').hide();
    $('.editForm textarea').hide();
    $('.editForm button').hide();

})

const $newSelector = $('.editButton')

$newSelector.click(function() {
    let buttonNum = event.target.id
    console.log("TRYING TO SHOW", buttonNum);
    console.log(buttonNum.substring(10))
    let idNum = buttonNum.substring(10)

    console.log('.showEditForm' + idNum +' input')
    $('#showEditForm' + idNum +' input').show();
    $('#showEditForm' + idNum +' textarea').show();
    $('#showEditForm' + idNum +' button').show();
    $('.editButton').hide();
})