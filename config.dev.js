module.exports = {
  avatar: {
    info: {
      name: {
        en: 'Avatar',
        tr: 'Resim'
      },
      description: {
        en: 'Change the bot\'s avatar.\n`avatar <link>`',
        tr: 'Botun avatarını değiştirir.\n`resim <link>`'
      },
      detailedDescription: {
        en: 'Change the bot\'s avatar.\n\n`avatar <link>`\n\nYou need admin approval to use this command if you are not an admin.',
        tr: 'Botun avatarını değiştirir.\n\n`avatar <link>`\n\nEğer admin değilseniz bu komutu kullanmak için admin onayına ihtiyacınız var.'
      },
      triggers: ['avatar', 'resim'],
    },
    responses: {
      confirm: {
        en: 'Avatar changed successfully. (if it\'s a gif, it might not work)',
        tr: 'Avatar başarıyla değiştirildi. (gif ise çalışmayabilir)'
      },
      error: {
        en: 'Something went wrong while changing the avatar.',
        tr: 'Avatar değiştirilirken bir hata oluştu.'
      },
      ask_link: {
        en: 'You need to provide a single link to change the avatar.',
        tr: 'Avatar değiştirmek için bir link girmeniz gerekiyor.'
      },
      ask_valid_link: {
        en: 'You need to provide a valid link.',
        tr: 'Geçerli bir link girmeniz gerekiyor.'
      },
      ask_admin_approval: {
        en: 'Admins, do you approve?',
        tr: 'Adminler, onaylıyor musunuz?'
      },
      admin_approval_confirm: {
        en: 'Yes.',
        tr: 'Evet.'
      },
      admin_approval_reject: {
        en: 'No.',
        tr: 'Hayır.'
      },
      reject_interaction: {
        en: 'Admins rejected your request.',
        tr: 'Adminler isteğinizi reddetti.'
      },
      not_admin: {
        en: 'You are not an admin.',
        tr: 'Admin değilsiniz.'
      }
    }
  },
  duration: {
    message: `User {name} has been in {channel} for {hours} hours, {mins} minutes and {secs} seconds.`,
  },
  greet: {
    message: 'Welcome {user}!',
  },
  help: {
    info: {
      name: {
        en: 'Help',
        tr: 'Yardım'
      },
      description: {
        en: 'You can get detailed info about a command by using `help <command>`.',
        tr: 'Bir komut hakkında detaylı bilgi almak için `yardım <komut>` kullanabilirsiniz.'
      },
      triggers: ['help', 'yardım'],
    },
    responses: {
      command_not_found_title: {
        en: 'Error',
        tr: 'Hata'
      },
      command_not_found: {
        en: 'Command not found. Please use `help` to see all commands.',
        tr: 'Komut bulunamadı. Tüm komutları görmek için `yardım` kullanın.'
      }
    }
  },
  keyword: {
    responses: {
      'ping': 'pong',
      'hello': 'hi',
    },
  },
  outro: {
    info: {
      name: {
        en: 'Outro',
        tr: 'Çıkış'
      },
      description: {
        en: 'Plays outro for a specified user.\n`outro <@user>`',
        tr: 'Belirtilen kullanıcı için outro çalar.\n`çıkış <@kullanıcı>`'
      },
      detailedDescription: {
        en: 'Plays outro for a specified user.\n\n`outro <@user>`\n\nUser must be in a voice channel for this command to work properly.',
        tr: 'Belirtilen kullanıcı için outro çalar.\n\n`çıkış <@kullanıcı>`\n\nBu komutun düzgün çalışması için kullanıcı bir ses kanalında olmalıdır.'
      },
      triggers: ['outro', 'çıkış'],
    },
    responses: {
      already_playing: {
        en: 'I\'m already playing outro for someone else.',
        tr: 'Şu anda başka biri için outro çalıyorum.'
      },
      ask_user: {
        en: 'You need to tag someone to play outro for them.',
        tr: 'Birisini etiketlemeniz gerekiyor.'
      },
      user_not_in_voice_channel: {
        en: 'User is not in a voice channel.',
        tr: 'Kullanıcı bir ses kanalında değil.'
      },
      cant_play_outro_for_self: {
        en: 'You can\'t play outro for me.',
        tr: 'Benim için outro çalamazsın.'
      }
    }
  },
  translate: {
    channels: [
      '0000000000000000000', // channel-id
    ],
  },
  vote: {
    info: {
      triggers: ['vote', 'oyla'],
    },
    channels: [
      '0000000000000000000', // channel-id
    ],
    responses: {
      ask_affirmation: {
        en: 'Please provide an affirmation.',
        tr: 'Lütfen bir olumlama girin.'
      },
      vote_passed: {
        en: 'Vote passed!',
        tr: 'Oylama başarılı!'
      },
      vote_failed: {
        en: 'Vote failed!',
        tr: 'Oylama başarısız!'
      }
    },
    tag: '0000000000000000000', // role-id
  },
  weather: {
    info: {
      name: {
        en: 'Weather',
        tr: 'Hava'
      },
      description: {
        en: 'See the weather of a city.\n`weather`',
        tr: 'Bir şehrin hava durumunu görüntüler.\n`hava`'
      },
      detailedDescription: {
        en: 'See the weather of a city.\n\n`weather`\n\nYou can select a city from the dropdown menu. Contact the bot owner if you want to add a city to the list.',
        tr: 'Bir şehrin hava durumunu görüntüler.\n\n`hava`\n\nAçılır menüden bir şehir seçebilirsiniz. Listeye bir şehir eklemek isterseniz bot sahibiyle iletişime geçin.'
      },
      triggers: ['weather', 'hava'],
    },
    responses: {
      ask_city: {
        en: 'Select a city',
        tr: 'Bir şehir seçin'
      },
      error: {
        en: 'An error occured',
        tr: 'Bir hata oluştu'
      }
    },
    cities: {
      en: [
        {
          label: 'Ankara',
          description: 'Capital city of Turkey',
          value: 'Ankara'
        },
        {
          label: 'İstanbul',
          description: 'Most populated city in Turkey',
          value: 'İstanbul'
        }
      ],
      tr: [
        {
          label: 'Ankara',
          description: 'Türkiye\'nin başkenti',
          value: 'Ankara'
        },
        {
          label: 'İstanbul',
          description: 'Türkiye\'nin en kalabalık şehri',
          value: 'İstanbul'
        }
      ]
    },
    message: {
      en: 'Weather for {city} is {temperature}°C and {weatherDescription}',
      tr: '{city} için hava {temperature}°C ve {weatherDescription}'
    }
  },
};