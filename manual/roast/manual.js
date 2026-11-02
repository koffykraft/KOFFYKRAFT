// KoffyKraft (C) 2025-2026 T M Thomas, trading as KoffyKraft (a unit of Thumpassery Agro). All rights reserved: see LICENSE.
// The Roast Manual's two small helpers, loaded from the same site (the site's rules allow scripts
// from itself only). The pages read fine without it.
// 1. Export: this page, one section, or a whole subject, through the browser's print sheet, where
//    "Save as PDF" or a printer can be chosen. Only the chosen part is printed, with a line saying
//    where it came from.
// 2. I want to: filters the task list as you type.
(function () {
  'use strict';
  var LABEL = {
    page: 'Export this page',
    section: 'Export this section',
    subject: 'Export this subject',
  };
  function printOnly(part) {
    var body = document.body;
    var stamp = document.createElement('p');
    stamp.className = 'printstamp';
    var what = part ? part.querySelector('h2') : null;
    stamp.textContent =
      document.title.replace(/ \| .*$/, '') +
      (what ? ', ' + what.textContent : '') +
      ' · KoffyKraft Roast Manual · ' +
      location.href.split('#')[0] +
      ' · ' +
      new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
    var main = document.querySelector('main');
    main.insertBefore(stamp, main.firstChild);
    if (part) {
      part.classList.add('only');
      body.classList.add('printing-part');
    }
    var done = function () {
      stamp.remove();
      if (part) part.classList.remove('only');
      body.classList.remove('printing-part');
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    window.print();
    setTimeout(function () {
      if (document.body.contains(stamp) && !window.matchMedia('print').matches) done();
    }, 1500);
  }
  document.querySelectorAll('.export').forEach(function (box) {
    var what = box.getAttribute('data-what');
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'exp';
    b.textContent = LABEL[what] || 'Export';
    b.title = 'Opens the print sheet: print it, or choose Save as PDF';
    b.addEventListener('click', function () {
      printOnly(what === 'section' ? box.closest('section') : null);
    });
    box.appendChild(b);
  });
  var q = document.getElementById('wantq');
  if (q) {
    q.closest('label').hidden = false;
    var items = document.querySelectorAll('.wants li');
    q.addEventListener('input', function () {
      var v = q.value.trim().toLowerCase();
      items.forEach(function (li) {
        li.hidden = v && li.textContent.toLowerCase().indexOf(v) < 0;
      });
    });
  }
})();
