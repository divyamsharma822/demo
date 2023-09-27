
#_Change_Working_Directory
cd /home/ec2-user/Hal_Admin_Panel

#_Delete_Old_PM2_Service
npx pm2 delete Hal_Panel
npx pm2 serve build/ 3000 --name "Hal_Panel" --spa
