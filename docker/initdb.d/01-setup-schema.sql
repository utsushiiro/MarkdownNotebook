SET FOREIGN_KEY_CHECKS=0;

create table user (
    id bigint not null auto_increment,
    name varchar(255) not null,
    email varchar(255) not null,
    password char(60) not null,
    self_group_id bigint not null,
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id),
    unique (name),
    unique (email),
    foreign key (self_group_id) references user_group (id)
);

create table user_group (
    id bigint not null auto_increment,
    name varchar(255) not null,
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp,
    primary key (id),
    unique (name)
);

create table user_group_mapping (
    user_id bigint not null,
    user_group_id bigint not null,
    is_admin boolean not null default false,
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp,
    unique (user_id, user_group_id),
    foreign key (user_id) references user (id),
    foreign key (user_group_id) references user_group (id)
);

create table note (
    id bigint not null auto_increment,
    title text not null,
    content text not null,
    user_group_with_read_authority_id bigint not null,
    user_group_with_edit_authority_id bigint not null,
    user_group_with_admin_authority_id bigint not null,
    updated_at timestamp not null default current_timestamp,
    created_at timestamp not null default current_timestamp,
    updated_by bigint not null,
    created_by bigint not null,
    primary key (id),
    foreign key (user_group_with_read_authority_id) references user_group (id),
    foreign key (user_group_with_edit_authority_id) references user_group (id),
    foreign key (user_group_with_admin_authority_id) references user_group (id),
    foreign key (updated_by) references user (id),
    foreign key (created_by) references user (id)
);

SET FOREIGN_KEY_CHECKS=1;
