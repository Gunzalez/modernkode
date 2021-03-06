<?php
    /**
     * on the form page add php code
     * 
     * session_start();
     * $kode = md5(mt_rand());
     * 
     * then add a hidden field in the form for the kode var
     * <input type="hidden" name="kode" value="<?php echo $kode?>" />
     */
    
    $to      = 'gunzalez@gmail.com';
    $subject = 'Modern kode: website enquiry';
    $headers = [
        'From' => 'info@modernkode.com',
        'Reply-To' => 'info@modernkode.com',
        'X-Mailer' => 'ModernKode'
    ];
    $errors = [];
    $message = '';

    session_start();

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        exit;
    }

    // test for ajax post //
    if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] !== 'XMLHttpRequest') {
        exit;
    }

    // xss test //
    if (!isset($_SESSION['kode'])) {
        exit;
    }
    if ($_SESSION['kode'] !== $_POST['kode']) {
        exit;
    }

    
    // validate posted data //
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Email is not valid';
    }
    else if (empty($_POST['name'])) {
        $errors['name'] = 'Name is a required field';
    }
    else if (empty($_POST['message'])) {
        $errors['message'] = 'Message is a required field';
    }
    
    // send mail //
    if (empty($errors)) {
        foreach ($_POST as $name => $value) {
            $message .= "{$name}: {$value}\n";
        }

        if (mail($to, $subject, $message, $headers)) {
            $response = [
                'status' => 'success',
                'msg' => "Thanks your message has been sent, we'll be in touch very soon."
            ];
        }
        else {
            $errors['system'] = 'Sorry your email could not be sent at the moment, please try later.';
        }
    }
    else {
        $response = [
            'status' => 'error',
            'msg' => "Sorry there was a problem.",
            'errors' => $errors
        ];
    }

    // send response //
    header('Content-type: application/json');
    echo json_encode($response);
    