'use strict';

function removeByValue(search) {
    var index = this.indexOf(search);
    if (index !== -1) {
        this.splice(index, 1);
    }
};

module.exports = function (io) {
    var userList = []; //사용자 리스트를 저장할곳
    io.on('connection', function (socket) {

        console.log("Socket id " + socket.id);
        console.log(socket.request.session.passpor);
        // 아래 두줄로 passport의 req.user의 데이터에 접근한다.
        var session = socket.request.session.passport;
        var user = typeof session !== 'undefined' ? session.user : "";

        // userList 필드에 사용자 명이 존재 하지 않으면 삽입
        // if(userList.indexOf(user.displayname) === -1){
        //     userList.push(user.displayname);
        // }

        if (userList.indexOf(socket.id) === -1) {
            userList.push(socket.id);
        }
        // io.emit('join', {userList : userList});
        // io.emit('join', "HI!!!");

        // //사용자 명과 메시지를 같이 반환한다.
        // socket.on('client message', function(data){
        //     io.emit('server message', { message : data.message , displayname : user.displayname });
        // });

        socket.on('chat message', function (data) {
            io.emit('chat message', { message: data.message, id: socket.id });
        });

        // //접속 해제시 처리
        // socket.on('disconnect', function(){            
        //     var index = userList.indexOf(socket.id);  
        //         if (index !== -1) {
        //             userList.splice(index, 1);
        //     }
        //     io.emit('leave', userList);
        // });
    });
};