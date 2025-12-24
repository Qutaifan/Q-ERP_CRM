<?php
/**
 * Qutaifan ERP - Microsoft Teams Webhook Integration
 * Send notifications to Teams channels
 */

class TeamsNotifier
{
    private $webhookUrl;
    
    /**
     * Create Teams notifier
     * @param string $webhookUrl Teams incoming webhook URL
     */
    public function __construct($webhookUrl = null)
    {
        global $conf;
        $this->webhookUrl = $webhookUrl ?: getDolGlobalString('QUTAIFAN_TEAMS_WEBHOOK_URL');
    }
    
    /**
     * Send a simple message to Teams
     */
    public function sendMessage($title, $message, $color = '0078D4')
    {
        if (empty($this->webhookUrl)) {
            return false;
        }
        
        $payload = [
            '@type' => 'MessageCard',
            '@context' => 'https://schema.org/extensions',
            'themeColor' => $color,
            'summary' => $title,
            'sections' => [[
                'activityTitle' => $title,
                'activitySubtitle' => date('Y-m-d H:i:s'),
                'activityImage' => 'https://erp.qutaifan.com/theme/common/qutaifan_icon_512.png',
                'text' => $message,
                'markdown' => true
            ]]
        ];
        
        return $this->send($payload);
    }
    
    /**
     * Send low stock alert
     */
    public function sendLowStockAlert($product, $currentStock, $minStock)
    {
        return $this->sendMessage(
            '⚠️ Low Stock Alert',
            "**{$product}** is running low!\n\n" .
            "- Current Stock: **{$currentStock}**\n" .
            "- Minimum Level: **{$minStock}**\n\n" .
            "Please reorder soon.",
            'FFA500' // Orange
        );
    }
    
    /**
     * Send new order notification
     */
    public function sendNewOrderAlert($orderRef, $customer, $total)
    {
        return $this->sendMessage(
            '🛒 New Order Received',
            "Order **{$orderRef}** from **{$customer}**\n\n" .
            "Total: **{$total}**",
            '28A745' // Green
        );
    }
    
    /**
     * Send overdue invoice alert
     */
    public function sendOverdueInvoiceAlert($invoiceRef, $customer, $amount, $daysOverdue)
    {
        return $this->sendMessage(
            '🔴 Overdue Invoice',
            "Invoice **{$invoiceRef}** is **{$daysOverdue} days** overdue!\n\n" .
            "- Customer: **{$customer}**\n" .
            "- Amount: **{$amount}**",
            'DC3545' // Red
        );
    }
    
    /**
     * Send generic alert with action buttons
     */
    public function sendAlertWithAction($title, $message, $actionName, $actionUrl, $color = '0078D4')
    {
        if (empty($this->webhookUrl)) {
            return false;
        }
        
        $payload = [
            '@type' => 'MessageCard',
            '@context' => 'https://schema.org/extensions',
            'themeColor' => $color,
            'summary' => $title,
            'sections' => [[
                'activityTitle' => $title,
                'activitySubtitle' => 'Qutaifan ERP',
                'text' => $message,
                'markdown' => true
            ]],
            'potentialAction' => [[
                '@type' => 'OpenUri',
                'name' => $actionName,
                'targets' => [[
                    'os' => 'default',
                    'uri' => $actionUrl
                ]]
            ]]
        ];
        
        return $this->send($payload);
    }
    
    /**
     * Send HTTP request to Teams webhook
     */
    private function send($payload)
    {
        $ch = curl_init($this->webhookUrl);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS => json_encode($payload),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        return $httpCode === 200;
    }
}

/**
 * Helper function for quick notifications
 */
function qutaifan_teams_notify($title, $message, $color = '0078D4')
{
    $notifier = new TeamsNotifier();
    return $notifier->sendMessage($title, $message, $color);
}
