#!/bin/bash

#_Change_Working_Directory
cd /home/ec2-user/Hal_Admin_Panel

#_Remove_Unused_Code
# rm -rf node_modules
# rm -rf build

#Install_node_modules_&_Make_React_Build
npm install --legacy-peer-deps
npm install -g svgo --legacy-peer-deps
npm install react react-dom react-scripts --legacy-peer-deps
npm install --save-dev @babel/plugin-proposal-private-property-in-object --legacy-peer-deps