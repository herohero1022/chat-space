json.(@message, :content, :image)
json.content @message.content
json.image @message.image
json.created_at @message.created_at.strftime("%Y/%m/%d %R")
json.user_name @message.user.name
json.id @message.id