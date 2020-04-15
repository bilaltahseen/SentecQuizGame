import { Howl } from 'howler';
const PlayAudio = (type) => {
  var sound = new Howl({
    src: ['SoundFx.mp3'],
    sprite: {
      OptionClick: [0, 231],
      Submit: [221, 430],
      NexLevel: [596, 2600],
      TimeUp: [3447, 3700],
      Finished: [7500, 18000, true],
    },
  });
  switch (type) {
    case 'CLICK':
      sound.play('OptionClick');
      break;
    case 'SUBMIT':
      sound.play('Submit');
      break;
    case 'NEXT_LEVEL':
      sound.play('NexLevel');
      break;
    case 'TIME_UP':
      sound.play('TimeUp');
      break;
    case 'FINISHED':
      sound.play('Finished');
      break;
    default:
      return;
  }
};
export default PlayAudio;
