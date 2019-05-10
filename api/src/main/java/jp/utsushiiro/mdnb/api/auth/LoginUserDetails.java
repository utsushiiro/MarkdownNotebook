package jp.utsushiiro.mdnb.api.auth;

import jp.utsushiiro.mdnb.api.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;

public class LoginUserDetails extends org.springframework.security.core.userdetails.User {

    private final User user;

    @Autowired
    LoginUserDetails(User user) {
        super(
                user.getName(),
                user.getPassword(),
                AuthorityUtils.createAuthorityList("ROLE_" + user.getUserRole().name())
        );
        this.user = user;
    }
}
