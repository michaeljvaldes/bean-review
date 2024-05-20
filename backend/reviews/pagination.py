from rest_framework import pagination


class CustomPagination(pagination.PageNumberPagination):
    def get_paginated_response(self, data):
        return pagination.Response({
            'count': self.page.paginator.count,
            'next': self.page.next_page_number(),
            'results': data
        })
