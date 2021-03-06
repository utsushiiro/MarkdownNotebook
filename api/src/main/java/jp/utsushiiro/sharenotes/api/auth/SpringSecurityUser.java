package jp.utsushiiro.sharenotes.api.auth;

import jp.utsushiiro.sharenotes.api.domain.User;
import lombok.Getter;
import org.springframework.security.core.authority.AuthorityUtils;

public class SpringSecurityUser extends org.springframework.security.core.userdetails.User {

    @Getter
    private User user;

    public SpringSecurityUser(User user) {
        super(
                user.getName(),
                user.getPassword(),
                // This application do not use GrantedAuthority for authorization process but uses UseGroup.
                AuthorityUtils.createAuthorityList("ROLE_NONE")
        );
        this.user = user;
    }
}
