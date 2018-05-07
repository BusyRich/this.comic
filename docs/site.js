const site = {
  currentIndex: 0,
  comic: null,
  $title: null,
  loadCurrentIndex() {
    this.$title.textContent = `#${comics.length - this.currentIndex} ${comics[this.currentIndex].name}`;
    this.comic.load(comics[this.currentIndex]);
    this.comic.render();
  },
  next: function() {
    if(this.currentIndex !== comics.length - 1) {
      this.currentIndex++;
      this.loadCurrentIndex();
    }
  },
  prev: function() {
    if(this.currentIndex > 0) {
      this.currentIndex--;
      this.loadCurrentIndex();
    }
  },
  random: function() {
    if(comics.length > 1) {
      this.currentIndex = Math.floor(Math.random() * comics.length);
      console.log(this.currentIndex);
      this.loadCurrentIndex();
    }
  }
};

window.onload = function() {
  site.comic = new Comic('#comic');
  site.$title = document.getElementById('title');

  document.getElementById('next').addEventListener('click', function() {
    site.next();
  });

  document.getElementById('prev').addEventListener('click', function() {
    site.prev();
  });

  document.getElementById('rand').addEventListener('click', function() {
    site.random();
  });

  site.loadCurrentIndex();
};