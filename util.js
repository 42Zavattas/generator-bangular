'use strict';
var path = require('path');
var fs = require('fs');
var chalk = require('chalk');

function escapeRegExp (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function filterFile (template) {
  // Find matches for params
  var filterMatches = template.match(/\(([^)]+)\)/g);
  var filters = [];
  if (filterMatches) {
    filterMatches.forEach(function (filter) {
      filters.push(filter.replace('(', '').replace(')', ''));
      template = template.replace(filter, '');
    });
  }
  return { name: template, filters: filters };
}

function templateIsUsable (self, filteredFile) {
  var filters = self.config.get('filters');
  var enabledFilters = [];
  for (var key in filters) {
    if (filters[key]) {
      enabledFilters.push(key);
    }
  }
  var matchedFilters = self._.intersection(filteredFile.filters, enabledFilters);
  // check that all filters on file are matched
  if (filteredFile.filters.length && matchedFilters.length !== filteredFile.filters.length) {
    return false;
  }
  return true;
}

var out = {
  bangLog: function (msg, color) {
    console.log('[' + chalk.blue('bangular') + ']: ' + chalk[color](msg));
  },
  fileExists: function (path) {
    if (fs.existsSync(path)) { return true; }
    return false;
  },
  appendTo: function (yeoman, opts) {
    var data = fs.readFileSync(opts.src).toString();

    fs.appendFile(opts.dest, data, function () {
      fs.unlinkSync(opts.src);
    });
  },
  appendOnTop: function (opts, cb) {
    fs.readFile(opts.dest, function (err, data) {
      if (err) { return cb(err, null); }
      fs.writeFile(opts.dest, opts.append + '\n', function (err) {
        if (err) { return cb(err, null); }
        fs.appendFile(opts.dest, data, function (err) {
          if (err) { return cb(err, null); }
          cb(null, true);
        });
      });
    });
  },
  appendNeedleOrOnTop: function (args, cb) {
    fs.readFile(args.file, function (err, data) {
      if (err || !data) { return cb(true); }
      if (data.toString().indexOf(args.needle) !== -1) {
        out.rewriteFile({
          file: args.file,
          needle: args.needle,
          splicable: [
            args.append
          ]
        }, cb);
      } else {
        out.appendOnTop({
          dest: args.file,
          append: args.append
        }, cb);
      }
    });
  },
  rewrite: function (args) {
    // check if splicable is already in the body text
    var re = new RegExp(args.splicable.map(function (line) {
      return '\s*' + escapeRegExp(line);
    }).join('\n'));

    if (re.test(args.haystack)) {
      return args.haystack;
    }

    var lines = args.haystack.split('\n');

    var otherwiseLineIndex = -1;
    lines.forEach(function (line, i) {
      if (line.indexOf(args.needle) !== -1) {
        otherwiseLineIndex = i;
      }
    });

    /* istanbul ignore if */
    if (otherwiseLineIndex === -1) {
      return lines.join('\n');
    }
    // Since we're not using the rewrite function directly but passing with the
    // appendNeedleOrOnTop function, this will never (h)append... Normally...

    var spaces = 0;
    while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
      spaces += 1;
    }

    var spaceStr = '';
    while ((spaces -= 1) >= 0) {
      spaceStr += ' ';
    }

    lines.splice(otherwiseLineIndex + 1, 0, args.splicable.map(function (line) {
      return spaceStr + line;
    }).join('\n'));

    return lines.join('\n');
  },
  rewriteFile: function (args, cb) {
    args.path = args.path || process.cwd();
    var fullPath = path.join(args.path, args.file);

    args.haystack = fs.readFileSync(fullPath, 'utf8');
    var body = out.rewrite(args);

    fs.writeFile(fullPath, body, function (err) {
      if (cb) { cb(err); }
    });
  },
  processDirectory: function (self, source, destination) {
    var root = self.isPathAbsolute(source) ? source : path.join(self.sourceRoot(), source);
    var files = self.expandFiles('**', { dot: true, cwd: root });
    var dest, src;

    files.forEach(function (f) {
      var filteredFile = filterFile(f);
      var name = filteredFile.name;
      var copy = false, stripped;

      src = path.join(root, f);
      dest = path.join(destination, name);

      if (path.basename(dest).indexOf('_') === 0) {
        stripped = path.basename(dest).replace(/^_/, '');
        dest = path.join(path.dirname(dest), stripped);
      }

      if (path.basename(dest).indexOf('#') === 0) {
        stripped = path.basename(dest).replace(/^#/, '');
        dest = path.join(path.dirname(dest), stripped);
        copy = true;
      }

      if (templateIsUsable(self, filteredFile)) {
        if (copy) {
          self.copy(src, dest);
        } else {
          self.template(src, dest);
        }
      }
    });
  }
};

module.exports = out;
