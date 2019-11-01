$(function(){

  function buildhtml(message){
    var addimage = message.image.url ? `<img class="message-text__image" src=${message.image.url}>` : "";
    var html = `<div class="message">
                <div class="message__info">
                  <p class="message__info--talker">
                    ${message.user_name}
                  </p>
                  <p class="message__info--date">
                    ${message.created_at}
                  </p>
                </div>
                <div class="message__text">
                  <p class="message__text">
                    ${message.content}
                  </p>
                </div>
                <div class="lower-message__image">
                  ${addimage}
                </div>
               </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildhtml(message);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast' );
      $('.form__submit').attr('disabled', false);
      $('.form__message').val('')
    })
    .fail(function(message){
      alert('メッセージ送信に失敗しました');
    })
  })
});