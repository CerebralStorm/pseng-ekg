var SortByCreatedAtMixin = {
  sortByCreatedAt: function(collection) {
    collection.sort(function(a, b){return moment(a.created_at) - moment(b.created_at)});
  }
};