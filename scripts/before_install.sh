#_Change_Working_Directory
cd /home/ec2-user/Hal_Admin_Panel

#_Update_&_Set_Node_Version
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -

#_Download_Node_&NPM
yum -y install nodejs npm

#_Download_PM2
npm install -g pm2
npm install -g serve