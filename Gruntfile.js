module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/<%= pkg.name %>.concat.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    concat: {
      js: {
        options: {
          process: function(src, filepath) {
            return '// Source: ' + filepath + '\n' + src;
          }
        },
        src: [
          'common.js',

          'kryptos/kryptos.js',
          'kryptos/Cipher/AES.js',
          'kryptos/Cipher/Blowfish.js',
          'kryptos/Cipher/DES3.js',
          'kryptos/Cipher/ARC4.js',
          'kryptos/Hash/baseHash.js',
          'kryptos/Hash/SHA.js',
          'kryptos/Hash/SHA256.js',
          'kryptos/Hash/SHA512.js',
          'kryptos/Hash/MD5.js',
          'kryptos/Hash/HMAC.js',
          'kryptos/PublicKey/RSA.js',
          'kryptos/PublicKey/DSA.js',
          'kryptos/Random/_UserFriendlyRNG.js',
          'kryptos/Random/Fortuna/SHAd256.js',
          'kryptos/Random/Fortuna/FortunaAccumulator.js',
          'kryptos/Random/Fortuna/FortunaGenerator.js',
          'kryptos/Random/OSRNG/browser.js',

          'python_shim.js',
          'BigInteger.js',

          'agent.js',
          'auth_handler.js',
          'ber.js',
          'channel.js',
          'client.js',
          'compress.js',
          'dsskey.js',
          'file.js',
          'hostkeys.js',
          'kex_gex.js',
          'kex_group1.js',
          'kex_group14.js',
          'message.js',
          'packet.js',
          'pkey.js',
          'rsakey.js',
          'sftp_attr.js',
          'sftp_client.js',
          'sftp_file.js',
          'sftp.js',
          'ssh_exception.js',
          'transport.js',
          'util.js',
          'win_pageant.js',
        ],
        dest: 'build/<%= pkg.name %>.concat.js',
      },
    },
    jshint: {
      files: [
          'kryptos/kryptos.js',
          'kryptos/Cipher/AES.js',
          'kryptos/Cipher/Blowfish.js',
          'kryptos/Cipher/DES3.js',
          'kryptos/Cipher/ARC4.js',
          'kryptos/Hash/baseHash.js',
          'kryptos/Hash/SHA.js',
          'kryptos/Hash/SHA256.js',
          'kryptos/Hash/SHA512.js',
          'kryptos/Hash/MD5.js',
          'kryptos/Hash/HMAC.js',
          'kryptos/PublicKey/RSA.js',
          'kryptos/PublicKey/DSA.js',
          'kryptos/Random/_UserFriendlyRNG.js',
          'kryptos/Random/Fortuna/SHAd256.js',
          'kryptos/Random/Fortuna/FortunaAccumulator.js',
          'kryptos/Random/Fortuna/FortunaGenerator.js',
          'kryptos/Random/OSRNG/browser.js',

          'common.js',
          'python_shim.js',
          'BigInteger.js',

          'agent.js',
          'auth_handler.js',
          'ber.js',
          'channel.js',
          'client.js',
          'compress.js',
          'dsskey.js',
          'file.js',
          'hostkeys.js',
          'kex_gex.js',
          'kex_group1.js',
          'kex_group14.js',
          'message.js',
          'packet.js',
          'pkey.js',
          'rsakey.js',
          'sftp_attr.js',
          'sftp_client.js',
          'sftp_file.js',
          'sftp.js',
          'ssh_exception.js',
          'transport.js',
          'util.js',
          'win_pageant.js',
        ],
      options: {
        // options here to override JSHint defaults
        shadow: true,
        esnext: true,
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  //grunt.registerTask('default', ['jshint', 'concat:js', 'uglify']);
  grunt.registerTask('default', ['concat:js', 'uglify']);

};
