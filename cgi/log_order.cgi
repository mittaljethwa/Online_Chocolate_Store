#!/usr/bin/perl  

# Jethwa, Mittal
# Class Account #jadrn020
# Project #4
# Fall 2017

use CGI;

$q = new CGI;

print "Content-type: text/html\n\n";

use DBI;

my $v = $q->cookie('jadrn020');
my $sth;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn020";
my $username = "jadrn020";
my $password = "desktop";
my $database_source = "dbi:mysql:$database:$host:$port";

my $dbh=DBI->connect($database_source, $username, $password)
or die 'Cannot connect to db';

@rows = split('\|\|',$v);

foreach $row (@rows) {
    ($sku, $qty) = split('\|',$row);
    $sth=$dbh->prepare("INSERT INTO SALES(sku, quantity) VALUES ('$sku',$qty)");
	$sth->execute();
} 

# Iterating over items in the tables:
# $sth=$dbh->prepare("select * from SALES");
# $sth->execute();

# my $str = "";
# while (my @row=$sth->fetchrow_array()) {
#     foreach $item(@row) {
#         $str .= $item."|";
#     }
#     $str .= ";";
# }

# print $str;

$sth-> finish();
$dbh-> disconnect();

print "Success";