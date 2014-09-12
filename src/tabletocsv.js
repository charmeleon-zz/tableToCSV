(function($) {
    $.fn.tableToCSV = function(settings) {
        var options = $.extend({delimiter:',', ignoreColumns: [], ignoreSelectors: ''}, settings), 
            csv;

        csv = $(this).find('tr:has(td,th)').map(function(i, row) {
            return rowToCSV($(row));
        }).get().join("\r\n");

        function rowToCSV($row) {
            return $row.find('td,th').map(function(j, col) {
                var $col = $(col);
                // Ignore this column?
                if (options.ignoreColumns.length && $.inArray(j, options.ignoreColumns)) {
                    return '';
                }
                // Ignore content in TDs flagged by these jQuery identifiers
                if ($.trim(options.ignoreSelectors).length && $col.children().length && 
                        $col.has(options.ignoreSelectors).length) {
                    return textToCSV($col.contents().not(options.ignoreSelectors).text());
                }
                // No supported flags to apply: just parse!
                return textToCSV($col.text());
            }).get().join(options.delimiter);
        }

        function textToCSV(text) { // quote-escape given text
            return '"' + text.replace('"', '""') + '"';
        }
    };
}(jQuery);
