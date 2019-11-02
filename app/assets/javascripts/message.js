$(function(){
  function buildhtml(message){
    var addimage = message.image.url ? `<img class="message-text__image" src=${message.image.url}>` : "";
    var html = `<div class="message" data-id="${message.id}">
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
      $('.new_message')[0].reset();
    })
    .fail(function(message){
      alert('メッセージ送信に失敗しました');
    })
  })

  var reloadMessages = function() {
    last_message_id = $('.message').last().data('id');
    var url = 'api/messages'
    $.ajax({
      url: url,
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function (message) {
        insertHTML = buildhtml(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast' );
      })
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  if (location.pathname.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 10000);
  }
});