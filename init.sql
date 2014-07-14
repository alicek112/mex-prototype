create table if not exists newspapers (id character(10) primary key, newspaperUrl text, tosUrl text, tosText longtext);
delete from newspapers;
insert into newspapers values ("1", "http://www.elsoldelcentro.com.mx", null, null);
insert into newspapers values ("2", "http://www.heraldo.mx", null, null);
insert into newspapers values ("3", "http://www.elvigia.net", null, null);