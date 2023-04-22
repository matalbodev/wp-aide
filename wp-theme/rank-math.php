<?php

/**
 * Filter whether we need to check for URL mismatch or not.
 */
add_filter('rank_math/registration/do_url_check', '__return_false');