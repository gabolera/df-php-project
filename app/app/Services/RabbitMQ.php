<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQ {
    private $amqp;
    private $channel;

    public function __construct()
    {
        if (!defined('SOCKET_EAGAIN')) {
            define('SOCKET_EAGAIN', 11);
        }

        $host = env('RABBITMQ_HOST', 'amqp');
        $port = env('RABBITMQ_PORT', 5672);
        $user = env('RABBITMQ_USER', 'rabbitmq');
        $password = env('RABBITMQ_PASSWORD', 'rabbitmq');
        $vhost = env('RABBITMQ_VHOST', '/');

        if (empty($host) || empty($port) || empty($user) || empty($password) || empty($vhost)) {
            throw new \Exception('RabbitMQ connection parameters are not properly set.');
        }

        $this->amqp = new AMQPStreamConnection($host, $port, $user, $password, $vhost);
        $this->channel = $this->amqp->channel();
        $this->channel->queue_declare('batch_file', false, true, false, false);
    }

    public function publish(string $message, string $queue): void
    {
        $msg = new AMQPMessage($message);
        $this->channel->basic_publish($msg, '', $queue);
    }

    public function __destruct()
    {
        $this->channel->close();
        $this->amqp->close();
    }
}
