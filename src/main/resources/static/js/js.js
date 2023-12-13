document.addEventListener('DOMContentLoaded', function() {
    const socket = new SockJS('/audio-stream');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);

        stompClient.subscribe('/topic/audio', function(audioData) {
            // Process and play audio data
            const audioPlayer = document.getElementById('audioPlayer');
            const blob = new Blob([audioData.body], { type: 'audio/wav' });
            const url = URL.createObjectURL(blob);
            audioPlayer.src = url;
            audioPlayer.play();
        });
    });
});