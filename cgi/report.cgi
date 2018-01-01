#!/usr/bin/perl  

# Jethwa, Mittal
# Class Account #jadrn020
# Project #4
# Fall 2017

use CGI;

$q = new CGI;

print "Content-type: text/html\n\n";

use DBI;

# my $v = $q->cookie('jadrn020');
my $sth;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn020";
my $username = "jadrn020";
my $password = "desktop";
my $database_source = "dbi:mysql:$database:$host:$port";

my $dbh=DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

# @rows = split('\|\|',$v);

# foreach $row (@rows) {
#     ($sku, $qty) = split('\|',$row);
#     $sth=$dbh->prepare("INSERT INTO SALES(sku, quantity) VALUES ('$sku',$qty)");
# 	$sth->execute();
# } 

print "<head>
    <meta charset=\"utf-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
    <title>Bertha's Deluxe Chocolates | Sales Report</title>
    <link rel=\"shortcut icon\" href=\"/~jadrn020/proj4/images/favicon.ico\" type=\"image/x-icon\">
    <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\">
    <link href=\"https://fonts.googleapis.com/css?family=Cinzel|Lobster|Overlock|Satisfy\" rel=\"stylesheet\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"/~jadrn020/proj4/css/report.css\" />
</head>";

print "<div class\"text-center\"><h2>Bertha's Deluxe Chocolates Sales Report</h2></div>";

# Iterating over items in the tables:
$sth=$dbh->prepare("select p.sku,SUM(p.cost) cost_price,SUM(p.retail) retail_price,SUM(s.quantity) qty,SUM(s.quantity*p.cost) total_cost,SUM(s.quantity*p.retail) total_retail,SUM(s.quantity*p.retail) - SUM(s.quantity*p.cost) total_profit from SALES s JOIN proj4.products p ON s.sku = p.sku GROUP BY p.sku ORDER BY sku");
$sth->execute();

# SUM(s.quantity*p.cost) grand_total_cost,SUM(s.quantity*p.retail) grand_total_retail,SUM(s.quantity*p.retail) - SUM(s.quantity*p.cost) grand_total_profit from SALES s JOIN proj4.products p ON s.sku = p.sku");

my $str = "<table class=\"report_table\" border=\"1\"><tr><th>Item SKU</th> <th>Cost Price</th> <th>Retail Price</th> <th>Quantity Sold</th> <th>Total Cost</th> <th>Total Retail</th> <th>Profit</th></tr>";
while (my @row=$sth->fetchrow_array()) {
	$str .= "<tr>";
    foreach $item(@row) {
        $str .= "<td>".$item."</td>";
    }
    $str .= "</tr>";
}

$sth=$dbh->prepare("SELECT SUM(s.quantity) grand_total_qty, FORMAT(SUM(s.quantity*p.cost),2) grand_total_cost,FORMAT(SUM(s.quantity*p.retail),2) grand_total_retail,FORMAT((SUM(s.quantity*p.retail) - SUM(s.quantity*p.cost)),2) grand_total_profit from SALES s JOIN proj4.products p ON s.sku = p.sku");
$sth->execute();

$str .= "<tr><th colspan=\"3\">Grand Total</th>";

while (my @row=$sth->fetchrow_array()) {
	foreach $item(@row) {
        $str .= "<th>".$item."</th>";
    }
}

$str .= "</tr></table>";
print $str;

$sth-> finish();
$dbh-> disconnect();

# print "Success";